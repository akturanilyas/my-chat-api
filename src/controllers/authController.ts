import { NextFunction, Request, Response } from 'express';
import { setTimeout } from "timers/promises";
import BaseController from './baseController';
import { AuthService } from '../services/authService';

export default class AuthController extends BaseController {
  static async register(req: Request, res: Response): Promise<Response> {
    const user = await new AuthService().register({
      user: { ...req.body },
    });

    return res.status(200).json({ data: user });
  }

  static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    return res.status(200).json({ login: 'user' });
  }
}
