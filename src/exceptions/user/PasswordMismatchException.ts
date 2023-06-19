import { HttpErrorBase } from '@curveball/http-errors/src';

export class PasswordMismatchException extends HttpErrorBase {
  httpStatus = 401;
  title = 'User not found';
}
