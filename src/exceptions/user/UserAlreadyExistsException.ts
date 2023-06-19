import { HttpErrorBase } from '@curveball/http-errors/src';

export class UserAlreadyExistsException extends HttpErrorBase {
  httpStatus = 409;
  title = 'User not found';
}
