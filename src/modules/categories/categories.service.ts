import { ID, Query } from 'node-appwrite';
import { client } from '../../config/appwrite';
import { APIError, logger } from '../../common';
import { NewCategoryDTO, UpdateCategoryDTO } from './categories.dtos';
import config from '../../config';
import { excludeKeys, removeUndefinedValues } from '../../common/helpers';
import TaskService from '../tasks/tasks.service';

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
      removeUndefinedValues(categoryDTO),
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
    const categoriesWithTasks = await Promise.all(
      categories.documents.map(this.getTasksByCategoryID),
    );
    return categoriesWithTasks.map(excludeKeys);
  }

  /**
   * Fetches all categories by a user.
   * @param
   * @returns list of categories
  */
  private static async getTasksByCategoryID(category): Promise<any[]> {
    const tasks = await TaskService.getByCategoryID(category.$id);
    logger.info(`tasks: ${tasks}`);
    logger.info({ ...category, tasks });
    return { ...category, tasks };
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
    const categoryWithTasks = await this.getTasksByCategoryID(category);
    return excludeKeys(categoryWithTasks);
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
