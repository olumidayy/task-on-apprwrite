import * as express from 'express';
import { APIResponse } from '../../common';
import TaskService from './tasks.service';
import { AuthGuard } from '../auth/middlewares';
import { NewTaskValidator, UpdateTaskValidator } from './tasks.validators';

const tasksRouter = express.Router();

export default (app: express.Router) => {
  app.use('/tasks', tasksRouter);
  tasksRouter.use(AuthGuard());

  tasksRouter.post(
    '/',
    NewTaskValidator,
    async (req, res, next) => {
      try {
        const task = await TaskService.create(req.body);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'task created.',
          code: 200,
          data: task,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.patch(
    '/:id',
    UpdateTaskValidator,
    async (req, res, next) => {
      try {
        const task = await TaskService.update(
          req.params.id,
          req.body,
        );
        res.status(200).json(new APIResponse({
          success: true,
          message: 'task updated.',
          code: 200,
          data: task,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.get(
    '/all',
    async (req, res, next) => {
      try {
        const tasks = await TaskService.getAll();
        res.status(200).json(new APIResponse({
          success: true,
          message: 'tasks fetched.',
          code: 200,
          data: tasks,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.get(
    '/category/:id',
    async (req, res, next) => {
      try {
        const tasks = await TaskService.getByCategoryID(req.params.id);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'tasks fetched.',
          code: 200,
          data: tasks,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.get(
    '/assigned',
    async (req, res, next) => {
      try {
        const tasks = await TaskService.getTasksAssignedToUser(req.body.user);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'tasks fetched.',
          code: 200,
          data: tasks,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.patch(
    '/:id/assign',
    async (req, res, next) => {
      try {
        const tasks = await TaskService.assignTaskToUser(req.params.id, req.body.email);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'task assigned.',
          code: 200,
          data: tasks,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.get(
    '/:id',
    async (req, res, next) => {
      try {
        const task = await TaskService.getById(req.params.id);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'task fetched.',
          code: 200,
          data: task,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.get(
    '/',
    async (req, res, next) => {
      try {
        const tasks = await TaskService.getByUserID(req.body.user);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'tasks fetched.',
          code: 200,
          data: tasks,
        }));
      } catch (error) {
        next(error);
      }
    },
  );

  tasksRouter.delete(
    '/:id',
    async (req, res, next) => {
      try {
        await TaskService.delete(req.params.id);
        res.status(200).json(new APIResponse({
          success: true,
          message: 'task deleted.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    },
  );
};
