import { HttpErrorBase } from '@curveball/http-errors/src';

export class UnauthorizedException extends HttpErrorBase {
  httpStatus = 401;
  title = 'Unauthorized';
}
