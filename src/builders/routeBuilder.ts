import { Express, NextFunction, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import * as fs from 'fs';
import { map } from 'lodash';
import path from 'path';
import { Middleware } from '../enums/middleware';
import { IRoute } from '../routes/IRoute.interface';
import { AbstractResource } from '../resources/AbstractResource';

const controllerDir = path.join(__dirname, '../routes');
const middlewaresDir = path.join(__dirname, '../middlewares');

const getMiddlewares = async (middlewares: Array<Middleware>) => {
  const functions: Array<() => void> = [];
  for (const fileName of middlewares) {
    const { [fileName]: middleware } = await import(`${middlewaresDir}/${fileName}`);
    functions.push(middleware as () => void);
  }

  return functions;
};

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

    const resourceClass = await route.handler(req, res, next).catch(next);

    if (resourceClass instanceof AbstractResource) {
      res.status(resourceClass.statusCode).json(resourceClass.data);
    }
  };

const buildController = async (app: Express) => {
  for (const fileName of fs.readdirSync(controllerDir)) {
    if (!fileName.includes('interface.')) {
      const { routes } = await import(`${controllerDir}/${fileName}`);

      for (const route of routes as Array<IRoute>) {
        const params: Array<unknown> = [];

        params.push(route.path);

        const middlewares =
          route.middlewares && (await getMiddlewares(route.middlewares));

        route.middlewares && params.push(middlewares);

        const methodFunction = generateMethodFunction(route);

        params.push(methodFunction);

        console.log(route.path);

        app[route.method as string](...params);
      }
    }
  }
};

export const routeBuilder = async (app: Express): Promise<void> => {
  await buildController(app);
};
