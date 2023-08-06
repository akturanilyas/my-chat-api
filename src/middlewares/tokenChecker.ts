import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = <string>req.headers['auth-token'] ?? <string>req.headers.authorization;

  const authService = new AuthService();

  const { newToken, userId, jwtPayload } = authService.checkToken(token);

  res.locals.jwtPayload = jwtPayload;

  res.setHeader('token', newToken);

  req.headers.userId = userId;

  next();
};
