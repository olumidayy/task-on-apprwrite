import { excludeKeys } from '../../common/helpers';
import { APIError } from '../../common';
import client from '../../config/appwrite';
import config from '../../config';

export default class UserService {
  /**
   * Fetches all users.
   * @param
   * @returns list of users
  */
  public static async getAll(): Promise<any[]> {
    const users = await client.listDocuments(
      config.databaseID,
      config.collections.users,
    );
    return users.documents.map(excludeKeys);
  }

  /**
   * Fetches one user by their ID.
   * @param id the user ID.
   * @returns a user or null.
  */
  public static async getById(id: string): Promise<any> {
    const user = await client.getDocument(
      config.databaseID,
      config.collections.users,
      id,
    );
    if (!user) {
      throw new APIError({ message: 'User not found.', code: 404 });
    }
    return excludeKeys(user);
  }

  /**
   * Deletes one user by their ID.
   * @param id the user ID.
   * @returns
  */
  public static async delete(id: string): Promise<void> {
    await client.deleteDocument(
      config.databaseID,
      config.collections.users,
      id,
    );
  }
}
