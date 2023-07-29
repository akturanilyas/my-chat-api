import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import { IRoute } from './IRoute.interface';
import { Middleware } from '../enums/middleware';
import ChatController from '../controllers/ChatController';

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.CHATS}`,
    method: HttpMethod.GET,
    handler: ChatController.chats,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.CHATS}`,
    method: HttpMethod.POST,
    handler: ChatController.createChat,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
];
