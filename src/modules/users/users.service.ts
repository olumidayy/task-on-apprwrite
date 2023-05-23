import { PrismaClient } from '@prisma/client';
import { APIError } from '../../common';

const prisma = new PrismaClient();

function exclude<User, Key extends keyof User>(
  user: User,
): Omit<User, Key> {
  const keys = ['password', 'otp'];
  for (let i = 0; i < keys.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    delete user[keys[i]];
  }
  return user;
}

export default class UserService {
  /**
   * Fetches all users.
   * @param
   * @returns list of users
  */
  public static async getAll(): Promise<any[]> {
    const users = await prisma.user.findMany();
    return users.map(exclude);
  }

  /**
   * Fetches one user by their ID.
   * @param id the user ID.
   * @returns a user or null.
  */
  public static async getById(id: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new APIError({ message: 'User not found.', code: 404 });
    }
    return exclude(user);
  }

  /**
   * Deletes one user by their ID.
   * @param id the user ID.
   * @returns
  */
  public static async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
