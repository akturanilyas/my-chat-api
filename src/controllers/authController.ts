import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import BaseController from './baseController';

export default class AuthController extends BaseController {
  static async register(req: Request, res: Response): Promise<Response> {
    const user = await new AuthService().register({
      user: { ...req.body },
    });

    return res.status(200).json({ data: user });
  }

  static async loginUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ login: 'user' });
  }
}