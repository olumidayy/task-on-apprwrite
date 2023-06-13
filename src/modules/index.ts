import * as express from 'express';
import authRoutes from './auth/auth.routes';
import categoriesRoutes from './categories/categories.routes';
import tasksRoutes from './tasks/tasks.routes';
import usersRoutes from './users/users.routes';

export default () => {
  const baseRouter = express.Router();
  authRoutes(baseRouter);
  categoriesRoutes(baseRouter);
  tasksRoutes(baseRouter);
  usersRoutes(baseRouter);
  return baseRouter;
};
