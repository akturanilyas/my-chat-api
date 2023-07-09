import { Request, Response } from 'express';
import BaseController from './BaseController';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

export default class UserController extends BaseController {
  static async getSelf(req: Request, res: Response): Promise<Response> {
    const user: User | null = await new UserService().getSelf();

    return res.status(201).json(user);
  }

  static async searchUsers(req: Request, res: Response): Promise<Response> {
    const user: User[] = await new UserService().searchUsers();

    return res.status(201).json(user);
  }
}
