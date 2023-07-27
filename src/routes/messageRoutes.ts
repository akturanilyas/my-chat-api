import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import { IRoute } from './IRoute.interface';
import { Middleware } from '../enums/middleware';
import MessageController from '../controllers/MessageController';

const controller = new MessageController();

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.MESSAGES}`,
    method: HttpMethod.POST,
    handler: controller.store,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.MESSAGES}`,
    method: HttpMethod.GET,
    handler: controller.index,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
];
