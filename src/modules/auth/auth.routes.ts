import * as express from 'express';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../common';
import { LoginDTO, RegisterDTO } from './auth.interfaces';
import { ChangePasswordValidator, ConfirmOTPValidator, LoginValidator, RegisterValidator, SendOTPValidator } from './auth.validators';

const AuthRouter = express.Router();

export default (app: express.Router) => {
  app.use('/auth', AuthRouter);

  AuthRouter.post(
    '/register',
    RegisterValidator,
    async (req, res, next) => {
      try {
        await AuthService.Register(req.body as RegisterDTO);
        res.status(201).json(new ApiResponse({
          success: true,
          message: 'Registration successful.',
          code: 201
        }));
      } catch (error) {
        next(error);
      }
    });

  AuthRouter.post(
    '/login',
    LoginValidator,
    async (req, res, next) => {
      try {
        const result = await AuthService.Login(req.body as LoginDTO);
        res.status(200).json(new ApiResponse({
          success: true,
          message: 'Authentication successful.',
          code: 200,
          data: result
        }));
      } catch (error) {
        next(error);
      }
    });

  AuthRouter.post(
    '/send-otp',
    SendOTPValidator,
    async (req, res, next) => {
      try {
        await AuthService.SendOTP(req.body.email);
        res.status(200).json(new ApiResponse({
          success: true,
          message: 'OTP sent.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    }
  );

  AuthRouter.post(
    '/confirm-otp',
    ConfirmOTPValidator,
    async (req, res, next) => {
      try {
        await AuthService.ConfirmOTP(req.body);
        res.status(200).json(new ApiResponse({
          success: true,
          message: 'OTP confirmed.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    }
  );

  AuthRouter.post(
    '/change-password',
    ChangePasswordValidator,
    async (req, res, next) => {
      try {
        await AuthService.ChangePassword(req.body);
        res.status(200).json(new ApiResponse({
          success: true,
          message: 'Password changed.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    }
  );

  AuthRouter.post(
    '/verify-email',
    ConfirmOTPValidator,
    async (req, res, next) => {
      try {
        await AuthService.VerifyEmail(req.body);
        res.status(200).json(new ApiResponse({
          success: true,
          message: 'Email verified.',
          code: 200,
        }));
      } catch (error) {
        next(error);
      }
    }
  );
}
