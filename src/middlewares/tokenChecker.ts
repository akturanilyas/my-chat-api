import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/user/UnauthorizedException';
import environment from '../builders/envBuilder';
import { serializeToken } from '../utils/commonUtil';

export const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = <string>req.headers['auth-token'] ?? <string>req.headers.authorization;

  let jwtPayload;

  try {
    const serializedToken = serializeToken(token);

    jwtPayload = jwt.verify(serializedToken, environment.jwt_token as string);
    res.locals.jwtPayload = jwtPayload;

    const { id } = jwtPayload;
    const newToken = jwt.sign({ id }, environment.jwt_token as string, {});

    res.setHeader('token', newToken);
    global.token = newToken;
    global.userId = id;
    req.headers.userId = id;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    throw new UnauthorizedException();
  }

  next();
};
