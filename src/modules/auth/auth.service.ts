import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { sign, SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { LoginDTO, RegisterDTO } from './auth.dtos';
import { APIError } from '../../common';
import config from '../../config';
import generateOTP from '../../common/helpers';
import prisma from '../../../prisma/client';
import { validateToken } from './middlewares';
import logger from '../../common/logger';

export default class AuthService {
  /**
   * Registers a new user, hashes their password and adds
   * their details to the database.
   * @param data - an interface with firstname, lastname, email
   * and password fields.
   * @returns - null
  */
  static async Register(data: RegisterDTO): Promise<User> {
    const user: User | null = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (user) {
      throw new APIError({
        message: 'Email is already in use.',
        code: 400,
      });
    }
    const password = await bcrypt.hash(data.password, config.saltRounds);
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
    return newUser;
  }

  /**
   * Takes in user details and logs them in if their account exists
   * @param data - an interface with email password fields.
   * @returns - an object containing the @param `userData` and a token
  */
  static async Login(data: LoginDTO) {
    const user: any = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!user) {
      throw new APIError({ message: 'User does not exist.', code: 404 });
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new APIError({ message: 'Invalid credentials.', code: 401 });
    }
    delete user.password;
    return { user, token: this.tokenize(user) };
  }

  /**
   * Sends OTP to user email.
   * @param email - user email
   * @returns null
  */
  static async SendOTP(email: string) {
    const user: User | null = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new APIError({ message: 'User does not exist.' });
    }
    const otp = generateOTP();
    const signInOptions: SignOptions = {
      expiresIn: '300000',
    };
    const token = sign({ otp }, config.jwtSecretKey, signInOptions);
    await prisma.user.update({
      where: { email },
      data: { otp: token },
    });
    logger.info(otp, token);
    // TODO: Handle Email Sending
  }

  /**
   * Checks to see that the OTP is valid.
   * @param email - user email
   * @param otp - user email
   * @returns null
  */
  static async ConfirmOTP({ email, otp }) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
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
    const user = await prisma.user.findFirst({
      where: { email },
    });
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
    await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });
  }

  /**
   * Confirm email
   * @returns null
  */
  static async VerifyEmail({ email, otp }) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new APIError({ message: 'Invalid email.', code: 400 });
    }
    const isValid = await this.checkOTP(user.otp, otp);
    if (isValid) {
      await prisma.user.update({
        where: { email },
        data: { isVerified: true },
      });
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
}
