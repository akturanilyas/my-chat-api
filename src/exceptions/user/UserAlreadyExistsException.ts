export class UserAlreadyExistsException extends Error {
  httpStatus = 409;
  title = 'User not found';
}
