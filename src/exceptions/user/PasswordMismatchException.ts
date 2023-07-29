import { AbstractException } from '../AbstractException.abstract';

export class PasswordMismatchException extends AbstractException {
  status = 401;
  message = 'User not found';
}
