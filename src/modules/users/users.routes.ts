import { PrismaClient, User } from '@prisma/client';
import * as express from 'express';
import { UserService } from './users.service';
import { ApiResponse } from '../../common';

const prisma = new PrismaClient()
const usersRouter = express.Router()

export default (app: express.Router) => {
  app.use('/users', usersRouter)

  usersRouter.get(`/`, async (req, res, next) => {
    try {
      const users: User[] = await UserService.getAll();
      res.status(200).json(new ApiResponse({
        success: true,
        message: 'Users fetched.',
        code: 200,
        data: users,
      }));
    } catch (error) {
      next(error);
    }
  })

  usersRouter.get('/:id', async (req, res, next) => {
    try {
      const user = await UserService.getById(Number(req.params.id));
      res.status(200).json(new ApiResponse({
        success: true,
        message: 'User fetched.',
        code: 200,
        data: user,
      }));
    } catch (error) {
      next(error);
    }
  })

  usersRouter.delete('/:id', async (req, res, next) => {
    try {
      await UserService.delete(Number(req.params.id));
      res.status(200).json(new ApiResponse({
        success: true,
        message: 'User deleted.',
        code: 200,
      }));
    } catch (error) {
      next(error);
    }
  })
}
