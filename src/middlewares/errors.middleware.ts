import { NextFunction, Request, Response } from 'express';

interface BaseError extends Error {
  status?: number;
}

export const notFoundError = (req: Request, res: Response, next: NextFunction): void => {
  const err: BaseError = new Error('Not Found');

  err.status = 404;
  next(err);
};

export const errorHandler = (
  err: Record<string, unknown>,
  req: Request,
  res: Response,
): Response =>
  res.status((err.status as number) || (err.httpStatus as number) || 500).json({
    message: err.message,
    status: err.status,
  });
