import { ENDPOINT } from '../constants/endpoint.constant';
import AuthController from '../controllers/AuthController';
import { HttpMethod } from '../enums/httpMethod';
import { AuthValidation } from '../validations/auth/AuthValidation';
import { IRoute } from './IRoute.interface';
import UserController from '../controllers/UserController';
import { Middleware } from '../enums/middleware';

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.LOGIN}`,
    method: HttpMethod.POST,
    handler: AuthController.loginUser,
    validate: AuthValidation.loginValidation(),
  },
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`,
    method: HttpMethod.POST,
    handler: AuthController.register,
  },
  {
    path: `/api${ENDPOINT.AUTH}/test`,
    method: HttpMethod.POST,
    handler: UserController.test,
    middlewares: [Middleware.TOKEN_CHECKER],
  },
];
