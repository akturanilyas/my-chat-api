import path from 'path';
import * as fs from 'fs';
import { Express, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IRoute } from '../routes/IRoute.interface';
import { Middleware } from '../enums/middleware';

const routeDir = path.join(process.cwd(), 'src/routes');

const getMiddlewares = (middlewares: Array<Middleware>): [] => [];

const buildController = async (app: Express) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const fileName of fs.readdirSync(routeDir)) {
    if (!fileName.endsWith('interface.ts')) {
      // eslint-disable-next-line no-await-in-loop
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

        console.log({ path: route.path, method: route.method });
      });
    }
  }
};

export const routeBuilder = async (app: Express): Promise<void> => {
  await buildController(app);
};
