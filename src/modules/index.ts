import * as express from 'express';
import authRoutes from './auth/auth.routes';
import usersRoutes from './users/users.routes';

export default () => {
  const baseRouter = express.Router();
  authRoutes(baseRouter);
  usersRoutes(baseRouter);
  return baseRouter;
};
