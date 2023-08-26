import { Request } from 'express';
import BaseController from './BaseController';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { SelfResource } from '../resources/user/SelfResource';
import { SearchResource } from '../resources/user/SearchResource';

export default class UserController extends BaseController {
  public static async getSelf(): Promise<SelfResource> {
    const user: User | null = await new UserService().getSelf();

    return new SelfResource({ resource: user });
  }

  public static async searchUsers(req: Request): Promise<SearchResource> {
    const user: User[] = await new UserService().searchUsers({
      name: req.query.name as string,
    });

    return new SearchResource({ resource: user });
  }
}
