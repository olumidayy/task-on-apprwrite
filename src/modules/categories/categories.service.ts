import { Category } from '@prisma/client';
import { APIError } from '../../common';
import prisma from '../../../prisma/client';
import { NewCategoryDTO, UpdateCategoryDTO } from './categories.dtos';

export default class categoryService {
  /**
   * creates new categorys.
   * @param
   * @returns newly created category
  */
  public static async create(categoryDTO: NewCategoryDTO): Promise<Category> {
    const category = await prisma.category.create({
      data: categoryDTO,
    });
    return category;
  }

  /**
   * updates a category.
   * @param
   * @returns updated category
  */
  public static async update(id: number, categoryDTO: UpdateCategoryDTO): Promise<Category> {
    const category = await prisma.category.update({
      where: { id },
      data: categoryDTO,
    });
    return category;
  }

  /**
   * Fetches all categorys by a user.
   * @param
   * @returns list of categories
  */
  public static async getByUserID(userId: number): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: { tasks: true },
    });
    return categories;
  }

  /**
   * Fetches one category by its ID.
   * @param id the category ID.
   * @returns a category or null.
  */
  public static async getById(id: number): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new APIError({ message: 'category not found.', code: 404 });
    }
    return category;
  }

  /**
   * Deletes one category by its ID.
   * @param id the category ID.
   * @returns
  */
  public static async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }
}
