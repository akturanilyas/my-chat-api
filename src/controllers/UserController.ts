import { Request, Response } from 'express';
import BaseController from './BaseController';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { SelfResource } from '../resources/user/SelfResource';
import { SearchResource } from '../resources/user/SearchResource';

export default class UserController extends BaseController {
  static async getSelf(req: Request, res: Response): Promise<Response> {
    const user: User | null = await new UserService().getSelf();

    const resource = new SelfResource({ resource: user });

    return res.status(200).json(resource);
  }

  static async searchUsers(req: Request, res: Response): Promise<Response> {
    const user: User[] = await new UserService().searchUsers({
      name: req.query.name as string,
    });

    const resource = new SearchResource({ resource: user });

    return res.status(200).json(resource);
  }
}
