import { AbstractException } from '../AbstractException.abstract';

export class FriendRequestAlreadyExist extends AbstractException {
  public status = 409;
  public message = 'Friend Request Already Exist';
}
