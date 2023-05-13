import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import routes from '../modules';
import config from '../config';
import { isCelebrateError } from 'celebrate';
import { ApiError, ApiResponse } from '../common';
import expressPinoLogger from "express-pino-logger";
import { logger } from '../common/logger';


export default ({ app }: { app: express.Application }) => {

  app.enable('trust proxy');
  app.use(cors());
  app.use(express.json());
  app.use(expressPinoLogger({ logger: logger }));
  app.use(config.api.prefix, routes());

  app.get('/api', (req, res, next) => {
    res.status(200).json({
      status: "success",
      message: "Hello World!",
      data: null
    });
  });

  app.get('/', (req, res, next) => {
    res.redirect('/api');
  });

  // For handling 404 errors.
  app.use((req, res, next) => {
    const err = new ApiError({ message:'That resource does not exist on this server.' });
    err.code = 404;
    next(err);
  });

  // For handling validation errors.
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      let errors: any =
        err.details.get("body") ||
        err.details.get("query") ||
        err.details.get("params");
      errors = errors.details.map((x: any) => x.message);
      err.message = errors.join(" | ");
      return res.status(400).json(new ApiResponse({
        success: false,
        code: 400,
        message: err.message,
      }));
    }
    next(err);
  });

  // For handling server errors.
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500);
    res.json(new ApiResponse({
      success: false,
      code: err.code || 500,
      message: err.message,
    }));
  });
};