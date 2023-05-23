import { Task } from '@prisma/client';
import { APIError } from '../../common';
import prisma from '../../../prisma/client';
import { NewTaskDTO, UpdateTaskDTO } from './tasks.dtos';

export default class TaskService {
  /**
   * creates new Tasks.
   * @param
   * @returns newly created Task
  */
  public static async create(taskDTO: NewTaskDTO): Promise<Task> {
    const task = await prisma.task.create({
      data: taskDTO,
    });
    return task;
  }

  /**
   * updates a Task.
   * @param
   * @returns updated Task
  */
  public static async update(id: number, taskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await prisma.task.update({
      where: { id },
      data: taskDTO,
    });
    return task;
  }

  /**
   * Fetches all Tasks.
   * @param
   * @returns list of Tasks
  */
  public static async getAll(): Promise<Task[]> {
    const Tasks = await prisma.task.findMany();
    return Tasks;
  }

  /**
   * Fetches all Tasks by a user.
   * @param
   * @returns list of Tasks
  */
  public static async getByUserID(userId: number): Promise<Task[]> {
    const Tasks = await prisma.task.findMany({
      where: { userId },
    });
    return Tasks;
  }

  /**
   * Fetches all Tasks by a category.
   * @param
   * @returns list of Tasks
  */
  public static async getByCategoryID(categoryId: number): Promise<Task[]> {
    const Tasks = await prisma.task.findMany({
      where: { categoryId },
    });
    return Tasks;
  }

  /**
   * Fetches one Task by its ID.
   * @param id the Task ID.
   * @returns a Task or null.
  */
  public static async getById(id: number): Promise<Task> {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new APIError({ message: 'Task not found.', code: 404 });
    }
    return task;
  }

  /**
   * Deletes one Task by its ID.
   * @param id the Task ID.
   * @returns
  */
  public static async delete(id: number): Promise<void> {
    await this.getById(id);
    await prisma.task.delete({
      where: { id },
    });
  }
}
