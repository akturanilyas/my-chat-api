import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import { IRoute } from './IRoute.interface';
import UserController from '../controllers/UserController';

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.SELF}`,
    method: HttpMethod.GET,
    handler: UserController.getSelf,
  },
];
