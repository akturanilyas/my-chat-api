import { AbstractException } from './AbstractException.abstract';

export class UnauthorizedException extends AbstractException {
  httpStatus = 401;
  title = 'Unauthorized';
}
