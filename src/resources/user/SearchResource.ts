import { AbstractResource } from '../AbstractResource';
import { Friend } from '../../models/Friend';
import { FriendStatus } from '../../enums/friendStatus';

type _User = {
  friend: Friend;
  id: string;
  getFullName: () => string;
  username: string;
};

export class SearchResource extends AbstractResource {
  public toJson(resource: object): object {
    const users = resource as Array<_User>;

    return users.map(user => ({
      id: user.id,
      full_name: user.getFullName(),
      username: user.username,
      is_friend: FriendStatus.ACCEPTED === user.friend?.status,
      status: user.friend?.status,
    }));
  }
}
