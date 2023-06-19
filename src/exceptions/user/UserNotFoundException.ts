import { AbstractException } from '../AbstractException.abstract';

export class UserNotFoundException extends AbstractException {
  httpStatus = 404;
  message = 'User not found';
}
