import { NextFunction, Request, Response } from 'express';
import BaseController from './baseController';
import { AuthService } from '../services/authService';
import { User } from '../models/user';

export default class AuthController extends BaseController {
  static async register(req: Request, res: Response): Promise<Response> {
    User.create({
      last_name: 'asd',
      first_name: 'asd',
      password: 'asdmasd',
      email: 'asdasd',
    });

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
