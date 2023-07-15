import { AbstractException } from '../AbstractException.abstract';

export class FriendRequestNotFound extends AbstractException {
  status = 404;
  title = 'Friend Request Not Found';
}
