import { AbstractException } from '../AbstractException.abstract';

export class FriendRequestNotFound extends AbstractException {
  status = 404;
  message = 'Friend Request Not Found';
}
