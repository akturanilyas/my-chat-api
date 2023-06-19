import { AbstractException } from '../AbstractException.abstract';

export class UserAlreadyExistsException extends AbstractException {
  httpStatus = 409;
  title = 'User not found';
}
