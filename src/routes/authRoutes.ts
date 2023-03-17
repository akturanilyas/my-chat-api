import { IRoute } from './IRoute.interface';
import { ENDPOINT } from '../constants/endpoint.constant';
import { HttpMethod } from '../enums/httpMethod';
import AuthController from '../controllers/authController';

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.LOGIN}`,
    method: HttpMethod.POST,
    handler: AuthController.loginUser,
  },
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`,
    method: HttpMethod.POST,
    handler: AuthController.register,
  },
];
