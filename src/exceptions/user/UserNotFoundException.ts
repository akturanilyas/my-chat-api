import {HttpErrorBase} from "@curveball/http-errors/src";

export class UserNotFoundException extends HttpErrorBase {
  httpStatus = 404;
  title = 'User not found';
}
