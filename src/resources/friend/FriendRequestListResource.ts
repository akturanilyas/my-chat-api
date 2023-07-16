import { AbstractResource } from '../AbstractResource';
import { Friend } from '../../models/Friend';

export class FriendRequestListResource extends AbstractResource {
  public toJson(resource: object): object {
    const friends = resource as Array<Friend>;

    return friends.map(friend => ({
      id: friend.id,
      user: { id: friend.requester.id, name: friend.requester.getFullName() },
    }));
  }
}
