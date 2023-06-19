export class PasswordMismatchException extends Error {
  httpStatus = 401;
  title = 'User not found';
}
