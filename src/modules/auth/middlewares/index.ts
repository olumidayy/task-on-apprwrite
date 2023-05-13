import config from '../../../config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from '../../../common';
import { User } from '@prisma/client';

export async function validateToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, config.jwtSecretKey, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded);
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
        const data: User = await validateToken(token);
        req.body.userId = Number(data.id);
        console.info(JSON.stringify(data), req.body);
      } catch (error) {
        return next(error);
      }
    } else {
      return next(new ApiError({ message: 'Unauthorized.', code: 401 }));
    }
    next();
  }
}