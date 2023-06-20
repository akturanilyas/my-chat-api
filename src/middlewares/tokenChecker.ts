import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = <string>req.headers['auth-token'] ?? <string>req.headers.authorization;

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.SECRET_JWT as string);
    res.locals.jwtPayload = jwtPayload;

    const { id } = jwtPayload;
    const newToken = jwt.sign({ id }, process.env.SECRET_JWT as string, {});
    res.setHeader('token', newToken);
    req.headers.user_id = id;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    throw new UnauthorizedException();
  }

  next();
};
