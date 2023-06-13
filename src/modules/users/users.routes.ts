import * as multer from 'multer';
import * as express from 'express';
import UserService from './users.service';
import APIResponse from '../../common/response';
import { AuthGuard } from '../auth/middlewares';
// import { logger } from '../../common';

const usersRouter = express.Router();

export default (app: express.Router) => {
  app.use('/users', usersRouter);
  usersRouter.use(AuthGuard());

  usersRouter.get('/', async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(new APIResponse({
        success: true,
        message: 'Users fetched.',
        code: 200,
        data: users,
      }));
    } catch (error) {
      next(error);
    }
  });

  usersRouter.get('/:id', async (req, res, next) => {
    try {
      const user = await UserService.getById(req.params.id);
      res.status(200).json(new APIResponse({
        success: true,
        message: 'User fetched.',
        code: 200,
        data: user,
      }));
    } catch (error) {
      next(error);
    }
  });

  usersRouter.patch(
    '/update-profile/:id',
    multer().single('profile_image'),
    async (req, res, next) => {
      try {
        if (req.file) {
          req.body.profile_image = req.file;
        }
        const user = await UserService.update(req.params.id, req.body);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'User updated.',
          code: 200,
          data: user,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  usersRouter.delete('/:id', async (req, res, next) => {
    try {
      await UserService.delete(req.params.id);
      res.status(200).json(new APIResponse({
        success: true,
        message: 'User deleted.',
        code: 200,
      }));
    } catch (error) {
      next(error);
    }
  });
};
