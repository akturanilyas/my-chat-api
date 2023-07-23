import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import { IRoute } from './IRoute.interface';
import { FriendValidation } from '../validations/FriendValidation';
import FriendController from '../controllers/FriendController';
import { Middleware } from '../enums/middleware';

const validation = new FriendValidation();
const controller = new FriendController();

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.FRIENDS}${ENDPOINT.ADD}`,
    method: HttpMethod.POST,
    handler: controller.addFriend,
    middlewares: [Middleware.TOKEN_CHECKER],
    validate: validation.addFriendValidation(),
  },
  {
    path: `/api${ENDPOINT.FRIENDS}${ENDPOINT.REMOVE}`,
    method: HttpMethod.DELETE,
    handler: controller.removeFriend,
    middlewares: [Middleware.TOKEN_CHECKER],
    validate: validation.removeFriendValidation(),
  },
  {
    path: `/api${ENDPOINT.FRIENDS}${ENDPOINT.REQUESTS}`,
    method: HttpMethod.GET,
    handler: controller.getFriendRequests,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.FRIENDS}/:id${ENDPOINT.ACCEPT}`,
    method: HttpMethod.POST,
    handler: controller.acceptFriend,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.FRIENDS}/:id${ENDPOINT.REJECT}`,
    method: HttpMethod.POST,
    handler: controller.rejectFriend,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
  {
    path: `/api${ENDPOINT.FRIENDS}`,
    method: HttpMethod.GET,
    handler: controller.getFriends,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
];
