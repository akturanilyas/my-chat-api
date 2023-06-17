import { ENDPOINT } from '../constants/endpoint.constant';
import AuthController from '../controllers/authController';
import { HttpMethod } from '../enums/httpMethod';
import { AuthValidation } from '../validations/auth/AuthValidation';
import { IRoute } from './IRoute.interface';

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
];