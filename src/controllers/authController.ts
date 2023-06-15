import { Request, Response } from 'express';
import { RegisterResource } from '../resources/registerResource';
import { AuthService } from '../services/authService';
import BaseController from './baseController';

export default class AuthController extends BaseController {
  static async register(req: Request, res: Response): Promise<Response> {
    const user = await new AuthService().register({
      user: { ...req.body },
    });

    const a = new RegisterResource({ statusCode: 200, message: 'ilyas', resource: user });
    console.log(a);

    return res.status(200).json(a);
  }

  static async loginUser(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ login: 'user' });
  }
}