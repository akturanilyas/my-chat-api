import { AbstractResource } from '../AbstractResource';
import { Friend } from '../../models/Friend';

export class FriendListResource extends AbstractResource {
  public toJson(resource: object): object {
    const friends = resource as Array<Friend>;

    return friends.map(friend => ({
      id: friend.id,
      user: { id: friend.receiver_id, name: friend.receiver.getFullName() },
    }));
  }
}
