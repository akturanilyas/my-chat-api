export class UserNotFoundException extends Error {
  httpStatus = 404;
  title = 'User not found';
}
