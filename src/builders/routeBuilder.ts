import { Express, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as fs from 'fs';
import path from 'path';
import { Middleware } from '../enums/middleware';
import { IRoute } from '../routes/IRoute.interface';

const routeDir = path.join(process.cwd(), 'src/routes');

const getMiddlewares = (middlewares: Array<Middleware>): [] => [];

const buildController = async (app: Express) => {
  for (const fileName of fs.readdirSync(routeDir)) {
    if (!fileName.endsWith('interface.ts')) {
      const { routes } = await import(`${routeDir}/${fileName}`);

      (routes as Array<IRoute>).forEach((route: IRoute) => {
        const params: Array<unknown> = [];

        params.push(route.path);

        route.middlewares && params.push(getMiddlewares(route.middlewares));

        // TODO Validation implementation
        // route.validate && params.push(route.validate);

        const methodFunction = (
          req: Request,
          res: Response,
          next: NextFunction,
        ): unknown => {
          try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
              return route.handler(req, res, next);
            }

            return res.status(400).json({ errors: errors.array() });
          } catch (e) {
            return next(e);
          }
        };

        params.push(methodFunction);

        app[route.method as string](...params);
      });
    }
  }
};

export const routeBuilder = async (app: Express): Promise<void> => {
  await buildController(app);
};
