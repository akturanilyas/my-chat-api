import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import { IRoute } from './IRoute.interface';
import UserController from '../controllers/UserController';
import { Middleware } from '../enums/middleware';

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.SELF}`,
    method: HttpMethod.GET,
    handler: UserController.getSelf,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.SEARCH_USER}`,
    method: HttpMethod.GET,
    handler: UserController.searchUsers,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
];
