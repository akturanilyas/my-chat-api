import { Request, Response } from 'express';
import AbstractController from './BaseController';
import { FriendService } from '../services/FriendService';
import { AddFriendResource } from '../resources/friend/AddFriendResource';
import { RemoveFriendResource } from '../resources/friend/RemoveFriendResource';
import { FriendRequestListResource } from '../resources/friend/FriendRequestListResource';
import { SuccessDataResource } from '../resources/SuccessDataResource';
import { AcceptFriendResource } from '../resources/friend/AcceptFriendResource';
import { FriendListResource } from '../resources/friend/FriendListResource';

export default class FriendController extends AbstractController {
  async addFriend(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    const service = new FriendService();

    const { friendRequest } = await service.addFriend(user_id);

    const resource = new AddFriendResource({ resource: friendRequest });

    return res.status(201).json(resource);
  }

  async removeFriend(req: Request, res: Response): Promise<Response> {
    const service = new FriendService();

    const { friendRequest } = await service.removeFriend(req.body.user_id);

    const resource = new RemoveFriendResource({ resource: friendRequest });

    return res.status(200).json(resource);
  }

  acceptFriend = async (req: Request, res: Response) => {
    const service = new FriendService();

    const { friendRequest } = await service.acceptFriend(req.params.id);

    return res.status(200).json(new AcceptFriendResource({ resource: friendRequest }));
  };

  rejectFriend = async (req: Request, res: Response) => {
    const service = new FriendService();

    await service.rejectFriend(req.params.id);

    return res.status(200).json(new SuccessDataResource({}));
  };

  getFriendRequests = async (req: Request, res: Response) => {
    const service = new FriendService();

    const requests = await service.getFriendRequests();

    const resource = new FriendRequestListResource({ resource: requests });

    return res.status(200).json(resource);
  };

  getFriends = async (req: Request, res: Response) => {
    const service = new FriendService();

    const friends = await service.getFriends({ name: req.query.name as string });

    const resource = new FriendListResource({ resource: friends });

    return res.status(200).json(resource);
  };
}
