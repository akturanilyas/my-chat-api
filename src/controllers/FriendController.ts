import { Request, Response } from 'express';
import AbstractController from './BaseController';
import { FriendService } from '../services/FriendService';
import { AddFriendResource } from '../resources/friend/AddFriendResource';

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

    const resource = new AddFriendResource({ resource: friendRequest });

    return res.status(201).json(resource);
  }
}
