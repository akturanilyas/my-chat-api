import { AbstractException } from '../AbstractException.abstract';

export class UnauthorizedException extends AbstractException {
  status = 401;
  title = 'Unauthorized';
}
