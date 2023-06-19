import { Express, NextFunction, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import * as fs from 'fs';
import { map } from 'lodash';
import path from 'path';
import { Middleware } from '../enums/middleware';
import { IRoute } from '../routes/IRoute.interface';

const routeDir = path.join(process.cwd(), 'src/routes');

const getMiddlewares = (middlewares: Array<Middleware>): [] => [];

const generateMethodFunction =
  (route: IRoute) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    if (route.validate) {
      const errors = await checkSchema(route.validate, ['body']).run(req);

      // TODO: [AKTURAN] handle errors
      if (
        map(errors, 'errors')
          .map(item => Boolean(item.length))
          .includes(true)
      ) {
        return res.status(400).json({ errors: map(errors, 'errors') });
      }
    }

    return route.handler(req, res, next).catch(next);
  };

const buildController = async (app: Express) => {
  for (const fileName of fs.readdirSync(routeDir)) {
    if (!fileName.endsWith('interface.ts')) {
      const { routes } = await import(`${routeDir}/${fileName}`);

      (routes as Array<IRoute>).forEach((route: IRoute) => {
        const params: Array<unknown> = [];

        params.push(route.path);

        route.middlewares && params.push(getMiddlewares(route.middlewares));

        const methodFunction = generateMethodFunction(route);

        params.push(methodFunction);

        app[route.method as string](...params);
      });
    }
  }
};

export const routeBuilder = async (app: Express): Promise<void> => {
  await buildController(app);
};
