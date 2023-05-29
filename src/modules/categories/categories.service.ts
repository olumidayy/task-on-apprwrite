import { ID, Query } from 'node-appwrite';
import client from '../../config/appwrite';
import { APIError } from '../../common';
import { NewCategoryDTO, UpdateCategoryDTO } from './categories.dtos';
import config from '../../config';
import { excludeKeys } from '../../common/helpers';

export default class categoryService {
  /**
   * creates new categories.
   * @param
   * @returns newly created category
  */
  public static async create(categoryDTO: NewCategoryDTO): Promise<any> {
    const category = await client.createDocument(
      config.databaseID,
      config.collections.categories,
      ID.unique(),
      categoryDTO,
    );
    return excludeKeys(category);
  }

  /**
   * updates a category.
   * @param
   * @returns updated category
  */
  public static async update(id: string, categoryDTO: UpdateCategoryDTO): Promise<any> {
    const category = await client.updateDocument(
      config.databaseID,
      config.collections.categories,
      id,
      categoryDTO,
    );
    return excludeKeys(category);
  }

  /**
   * Fetches all categories by a user.
   * @param
   * @returns list of categories
  */
  public static async getByUserID(userId: string): Promise<any[]> {
    const categories = await client.listDocuments(
      config.databaseID,
      config.collections.categories,
      [Query.equal('user', userId)],
    );
    return categories.documents.map(excludeKeys);
  }

  /**
   * Fetches one category by its ID.
   * @param id the category ID.
   * @returns a category or null.
  */
  public static async getById(id: string): Promise<any> {
    const category = await client.getDocument(
      config.databaseID,
      config.collections.categories,
      id,
    );
    if (!category) {
      throw new APIError({ message: 'Category not found.', code: 404 });
    }
    return excludeKeys(category);
  }

  /**
   * Deletes one category by its ID.
   * @param id the category ID.
   * @returns
  */
  public static async delete(id: string): Promise<void> {
    await this.getById(id);
    await client.deleteDocument(
      config.databaseID,
      config.collections.categories,
      id,
    );
  }
}
