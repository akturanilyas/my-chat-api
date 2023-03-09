import { NextFunction, Request, Response } from 'express';
import BaseController from './baseController';

export default class AuthController extends BaseController {
  static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>>> {
    return res.status(200).json({ login: 'user' });
  }
}
