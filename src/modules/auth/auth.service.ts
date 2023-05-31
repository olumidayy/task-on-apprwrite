import * as bcrypt from 'bcrypt';
import { sign, SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { ID, Query } from 'node-appwrite';
import { LoginDTO, RegisterDTO } from './auth.dtos';
import { APIError } from '../../common';
import config from '../../config';
import { excludeKeys, generateOTP } from '../../common/helpers';
import { validateToken } from './middlewares';
import logger from '../../common/logger';
import client from '../../config/appwrite';
import MailerService from '../../services/mailer';

export default class AuthService {
  static async findUserByEmail(email: string) {
    const query: any = await client.listDocuments(
      config.databaseID,
      config.collections.users,
      [Query.equal('email', email)],
    );
    if (!query.total) {
      return null;
    }
    return query.documents[0];
  }

  /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstname, lastname, email
   * and password fields.
   * @returns - null
  */
  static async Register(data: RegisterDTO): Promise<any> {
    logger.info(config.mailer.user, config.mailer.password);
    const user: any = await this.findUserByEmail(data.email);
    if (user) {
      throw new APIError({
        message: 'Email is already in use.',
        code: 400,
      });
    }
    const password = await bcrypt.hash(data.password, config.saltRounds);
    const newUser = await client.createDocument(
      config.databaseID,
      config.collections.users,
      ID.unique(),
      {
        ...data,
        password,
      },
    );
    const otp = await this.setOTP(newUser);
    MailerService.sendWelcomeMail(newUser, otp);
    return excludeKeys(newUser);
  }

  /**
   * Takes in user details and logs them in if their account exists
   * @param data - an interface with email password fields.
   * @returns - an object containing the @param `userData` and a token
  */
  static async Login(data: LoginDTO) {
    let user: any = await this.findUserByEmail(data.email);
    if (!user) {
      throw new APIError({ message: 'User does not exist.', code: 404 });
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new APIError({ message: 'Invalid credentials.', code: 401 });
    }
    user = excludeKeys(user);
    return { user, token: this.tokenize(user) };
  }

  /**
   * Sends OTP to user email.
   * @param email - user email
   * @returns null
  */
  static async SendOTP(email: string) {
    const user: any = await this.findUserByEmail(email);
    if (!user) {
      throw new APIError({ message: 'User does not exist.' });
    }
    const otp = await this.setOTP(user);
    MailerService.sendOTP(user, otp);
  }

  /**
   * Checks to see that the OTP is valid.
   * @param email - user email
   * @param otp - user email
   * @returns null
  */
  static async ConfirmOTP({ email, otp }) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new APIError({ message: 'Invalid email.', code: 400 });
    }
    const isValid = await this.checkOTP(user.otp, otp);
    if (!isValid) {
      throw new APIError({ message: 'Invalid OTP.', code: 400 });
    }
  }

  /**
   * Change Password
   * @returns null
  */
  static async ChangePassword({
    email, password, confirmPassword, otp,
  }) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new APIError({ message: 'Invalid email.', code: 400 });
    }
    const isValid = await this.checkOTP(user.otp, otp);
    if (!isValid) {
      throw new APIError({ message: 'Invalid OTP.', code: 400 });
    }
    if (password !== confirmPassword) {
      throw new APIError({ message: 'Passwords do not match.', code: 400 });
    }
    const newPassword = await bcrypt.hash(password, config.saltRounds);
    await client.updateDocument(
      config.databaseID,
      config.collections.users,
      user.$id,
      { password: newPassword },
    );
  }

  /**
   * Confirm email
   * @returns null
  */
  static async VerifyEmail({ email, otp }) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new APIError({ message: 'Invalid email.', code: 400 });
    }
    const isValid = await this.checkOTP(user.otp, otp);
    if (isValid) {
      await client.updateDocument(
        config.databaseID,
        config.collections.users,
        user.$id,
        { isVerified: true },
      );
      MailerService.verifiedEmail(user);
    } else {
      throw new APIError({ message: 'Invalid code.', code: 400 });
    }
  }

  /**
   * @param payload - an object which houses the user's
   *  information.
   * @returns - a token
  */
  private static tokenize(payload: any) {
    const signInOptions: SignOptions = {
      expiresIn: '1d',
    };

    return sign(payload, config.jwtSecretKey, signInOptions);
  }

  /**
   * @param payload - an object which houses the user's
   *  information.
   * @returns - a token
  */
  private static async checkOTP(token: any, providedOTP) {
    logger.info(token, providedOTP);
    try {
      const { otp } = await validateToken(token);
      logger.info(providedOTP, otp);
      return otp === providedOTP;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new APIError({ message: 'OTP is expired.', code: 400 });
      }
      return false;
    }
  }

  /**
   * @param user - an object which houses the user's
   *  information.
   * @returns - the OTP
  */
  private static async setOTP(user) {
    const otp = generateOTP();
    const signInOptions: SignOptions = {
      expiresIn: '300000',
    };
    const token = sign({ otp }, config.jwtSecretKey, signInOptions);
    await client.updateDocument(
      config.databaseID,
      config.collections.users,
      user.$id,
      { otp: token },
    );
    logger.info(otp, token);
    return otp;
  }
}
