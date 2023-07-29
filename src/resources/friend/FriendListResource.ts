import { AbstractResource } from '../AbstractResource';
import { Friend } from '../../models/Friend';
import { User } from '../../models/User';

export class FriendListResource extends AbstractResource {
  public toJson(resource: object): object {
    const friends = resource as Array<
      Friend & {
        user: User;
      }
    >;

    return friends.map(friend => ({
      id: friend.id,
      user: { name: friend.user.getFullName() },
    }));
  }
}
