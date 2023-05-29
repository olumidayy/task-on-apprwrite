import { ID, Query } from 'node-appwrite';
import client from '../../config/appwrite';
import { APIError } from '../../common';
import { NewTaskDTO, UpdateTaskDTO } from './tasks.dtos';
import config from '../../config';
import { excludeKeys } from '../../common/helpers';

export default class TaskService {
  /**
   * creates new Tasks.
   * @param
   * @returns newly created Task
  */
  public static async create(taskDTO: NewTaskDTO): Promise<any> {
    const task = await client.createDocument(
      config.databaseID,
      config.collections.tasks,
      ID.unique(),
      taskDTO,
    );
    return excludeKeys(task);
  }

  /**
   * updates a Task.
   * @param
   * @returns updated Task
  */
  public static async update(id: string, taskDTO: UpdateTaskDTO): Promise<any> {
    const task = await client.updateDocument(
      config.databaseID,
      config.collections.tasks,
      id,
      taskDTO,
    );
    return excludeKeys(task);
  }

  /**
   * Fetches all Tasks.
   * @param
   * @returns list of Tasks
  */
  public static async getAll(): Promise<any[]> {
    const tasks = await client.listDocuments(
      config.databaseID,
      config.collections.tasks,
    );
    return tasks.documents.map(excludeKeys);
  }

  /**
   * Fetches all Tasks by a user.
   * @param
   * @returns list of Tasks
  */
  public static async getByUserID(userId: string): Promise<any[]> {
    const tasks = await client.listDocuments(
      config.databaseID,
      config.collections.tasks,
      [Query.equal('user', userId)],
    );
    return tasks.documents.map(excludeKeys);
  }

  /**
   * Fetches all Tasks by a category.
   * @param
   * @returns list of Tasks
  */
  public static async getByCategoryID(categoryId: string): Promise<any[]> {
    const tasks = await client.listDocuments(
      config.databaseID,
      config.collections.tasks,
      [Query.equal('category', categoryId)],
    );
    return tasks.documents.map(excludeKeys);
  }

  /**
   * Fetches one Task by its ID.
   * @param id the Task ID.
   * @returns a Task or null.
  */
  public static async getById(id: string): Promise<any> {
    const task = await client.getDocument(
      config.databaseID,
      config.collections.tasks,
      id,
    );
    if (!task) {
      throw new APIError({ message: 'Task not found.', code: 404 });
    }
    return excludeKeys(task);
  }

  /**
   * Deletes one Task by its ID.
   * @param id the Task ID.
   * @returns
  */
  public static async delete(id: string): Promise<void> {
    await this.getById(id);
    await client.deleteDocument(
      config.databaseID,
      config.collections.tasks,
      id,
    );
  }
}
