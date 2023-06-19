import { AbstractException } from '../AbstractException.abstract';

export class PasswordMismatchException extends AbstractException {
  httpStatus = 401;
  title = 'User not found';
}
