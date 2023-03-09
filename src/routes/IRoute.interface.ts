import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from '../enums/httpMethod';
import { Middleware } from '../enums/middleware';

export interface IRoute {
  path: string;
  method: HttpMethod;
  middlewares?: Array<Middleware>;
  validate?: Array<string>;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response<unknown, Record<string, unknown>>>;
}
