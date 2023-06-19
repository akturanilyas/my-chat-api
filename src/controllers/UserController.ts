import { Request, Response } from 'express';
import BaseController from './BaseController';

export default class UserController extends BaseController {
  static async test(req: Request, res: Response): Promise<Response> {
    return res.status(201).json('eassy');
  }
}
