import { AbstractException } from '../AbstractException.abstract';

export class FriendRequestAlreadyExist extends AbstractException {
  status = 409;
  message = 'Friend Request Already Exist';
}
