import { IRoute } from './IRoute.interface';
import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import AuthController from '../controllers/auth';

export const routes: Array<IRoute> = [
  {
    path: ENDPOINT.LOGIN,
    method: HttpMethod.POST,
    handler: AuthController.loginUser,
  },
];
