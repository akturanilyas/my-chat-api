import { Request } from 'express';
import AbstractController from './BaseController';
import { FriendService } from '../services/FriendService';
import { AddFriendResource } from '../resources/friend/AddFriendResource';
import { RemoveFriendResource } from '../resources/friend/RemoveFriendResource';
import { FriendRequestListResource } from '../resources/friend/FriendRequestListResource';
import { SuccessDataResource } from '../resources/SuccessDataResource';
import { AcceptFriendResource } from '../resources/friend/AcceptFriendResource';
import { FriendListResource } from '../resources/friend/FriendListResource';

export default class FriendController extends AbstractController {
  public async addFriend(req: Request): Promise<AddFriendResource> {
    const { user_id } = req.body;

    const service = new FriendService();

    const { friendRequest } = await service.addFriend(user_id);

    return new AddFriendResource({ resource: friendRequest, statusCode: 201 });
  }

  public async removeFriend(req: Request): Promise<RemoveFriendResource> {
    const service = new FriendService();

    const { friendRequest } = await service.removeFriend(req.body.user_id);

    return new RemoveFriendResource({ resource: friendRequest });
  }

  public async acceptFriend(req: Request): Promise<AcceptFriendResource> {
    const service = new FriendService();

    const { friendRequest } = await service.acceptFriend(req.params.id);

    return new AcceptFriendResource({ resource: friendRequest });
  }

  public async rejectFriend(req: Request): Promise<SuccessDataResource> {
    const service = new FriendService();

    await service.rejectFriend(req.params.id);

    return new SuccessDataResource({});
  }

  public async getFriendRequests(): Promise<FriendListResource> {
    const service = new FriendService();

    const requests = await service.getFriendRequests();

    return new FriendRequestListResource({ resource: requests });
  }

  public async getFriends(req: Request): Promise<FriendListResource> {
    const service = new FriendService();

    const friends = await service.getFriends({ name: req.query.name as string });

    return new FriendListResource({ resource: friends });
  }
}
