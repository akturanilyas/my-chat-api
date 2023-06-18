import { Request, Response } from 'express';
import { RegisterResource } from '../resources/auth/RegisterResource';
import { AuthService } from '../services/authService';
import BaseController from './BaseController';
import { LoginResource } from '../resources/auth/LoginResource';

export default class AuthController extends BaseController {
  static async register(req: Request, res: Response): Promise<Response> {
    const user = await new AuthService().register({
      user: { ...req.body },
    });

    const resource = new RegisterResource({ resource: user });

    return res.status(201).json(resource.toJson());
  }

  static async loginUser(req: Request, res: Response): Promise<Response> {
    const user = await new AuthService().login(req.body);

    const resource = new LoginResource({ resource: user });

    return res.status(201).json(resource.toJson());
  }
}
