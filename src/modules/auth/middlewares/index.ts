import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { APIError } from '../../../common';
import config from '../../../config';
import logger from '../../../common/logger';

export async function validateToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, config.jwtSecretKey, (error, decoded) => {
      if (error) {
        return reject(new APIError({ message: error.message, code: 400 }));
      }
      return resolve(decoded);
    });
  });
}

function getTokenFromHeader(req: Request) {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
    || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

export function AuthGuard() {
  return async function attachUserData(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeader(req);
    if (token) {
      try {
        const data = await validateToken(token);
        logger.info(`user ${data}`);
        req.body.user = data.$id;
        logger.info(req.body);
      } catch (error) {
        return next(error);
      }
    } else {
      return next(new APIError({ message: 'Unauthorized.', code: 401 }));
    }
    return next();
  };
}
