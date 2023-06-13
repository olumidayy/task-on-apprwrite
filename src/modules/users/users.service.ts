import { ID, InputFile } from 'node-appwrite';
import { excludeKeys, removeUndefinedValues } from '../../common/helpers';
import { APIError, logger } from '../../common';
import { client, storage } from '../../config/appwrite';
import config from '../../config';
import { UpdateProfileDTO } from './users.dtos';

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
    const user: any = await client.getDocument(
      config.databaseID,
      config.collections.users,
      id,
    );
    if (!user) {
      throw new APIError({ message: 'User not found.', code: 404 });
    }
    if (user.profile_image) {
      const profileImage = await UserService.getProfilePicture(user.profile_image);
      user.profile_image = profileImage;
    }
    return excludeKeys(user);
  }

  /**
   * Fetches a profile picture ID.
   * @param id the file ID.
   * @returns a fiel or null.
  */
  public static async getProfilePicture(id: string): Promise<any> {
    const file = await storage.getFileView(
      config.bucketID,
      id,
    );
    if (!file) {
      throw new APIError({ message: 'User not found.', code: 404 });
    }
    return excludeKeys(file);
  }

  /**
   * updates a Task.
   * @param
   * @returns updated Task
  */
  public static async update(id: string, profileDTO: UpdateProfileDTO): Promise<any> {
    const data = { ...profileDTO };
    if (profileDTO.profile_image) {
      const { buffer, originalname } = profileDTO.profile_image;
      const file = await storage.createFile(
        config.bucketID,
        ID.unique(),
        InputFile.fromBuffer(buffer, originalname),
      );
      data.profile_image = file.$id;
    }
    logger.info(removeUndefinedValues({ ...data }));
    const user = await client.updateDocument(
      config.databaseID,
      config.collections.users,
      id,
      removeUndefinedValues({ ...data }),
    );
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
