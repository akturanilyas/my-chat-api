import { ENDPOINT } from '../constants/endpoint.constant';
import AuthController from '../controllers/AuthController';
import { HttpMethod } from '../enums/httpMethod';
import { AuthValidation } from '../validations/AuthValidation';
import { IRoute } from './IRoute.interface';

const validation = new AuthValidation();

export const routes: Array<IRoute> = [
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.LOGIN}`,
    method: HttpMethod.POST,
    handler: AuthController.loginUser,
    validate: validation.loginValidation(),
  },
  {
    path: `/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`,
    method: HttpMethod.POST,
    handler: AuthController.register,
    validate: validation.registerValidation(),
  },
];
