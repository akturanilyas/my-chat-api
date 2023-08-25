import { Request } from 'express';
import { RegisterResource } from '../resources/auth/RegisterResource';
import { AuthService } from '../services/AuthService';
import AbstractController from './BaseController';
import { LoginResource } from '../resources/auth/LoginResource';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';

export default class AuthController extends AbstractController {
  static async register(req: Request): Promise<RegisterResource> {
    const user = await new AuthService().register({
      user: { ...req.body },
    });

    return new RegisterResource({ resource: user, statusCode: 201 });
  }

  static async loginUser(req: Request): Promise<LoginResource> {
    const service = new AuthService();

    let user;

    try {
      user = await service.login(req.body);
    } catch (e) {
      throw new UserNotFoundException();
    }

    return new LoginResource({ resource: user });
  }
}
