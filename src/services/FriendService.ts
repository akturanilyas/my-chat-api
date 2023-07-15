import { Friend } from '../models/Friend';
import { FriendStatus } from '../enums/friendStatus';
import { FriendRequestNotFound } from '../exceptions/friend/FriendRequestNotFound';

export class FriendService {
  addFriend = async (userId: string) => {
    const friendRequest = Friend.create({
      status: FriendStatus.PENDING,
      receiver_id: userId,
      user_id: global.user_id,
    });

    await friendRequest.save();

    const targetRequest = Friend.create({
      status: FriendStatus.PENDING,
      user_id: userId,
      receiver_id: global.user_id,
    });

    await targetRequest.save();

    return { friendRequest, targetRequest };
  };

  removeFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    await targetRequest?.softRemove();
    await friendRequest?.softRemove();

    return { friendRequest, targetRequest };
  };

  acceptFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    friendRequest.status = FriendStatus.ACCEPTED;
    await friendRequest.save();

    targetRequest.status = FriendStatus.ACCEPTED;
    await targetRequest.save();
  };

  rejectFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    friendRequest.status = FriendStatus.REJECTED;
    await friendRequest.save();

    targetRequest.status = FriendStatus.REJECTED;
    await targetRequest.save();

    return friendRequest;
  };

  findFriendsRequests = async (id: string) => {
    const friendRequest = await Friend.findOneBy({ id, status: FriendStatus.ACCEPTED });

    if (!friendRequest) {
      throw new FriendRequestNotFound();
    }

    const targetRequest = await Friend.findOneBy({
      user_id: friendRequest?.receiver_id,
      receiver_id: friendRequest?.user_id,
      status: FriendStatus.ACCEPTED,
    });

    if (!targetRequest) {
      throw new FriendRequestNotFound();
    }

    return { friendRequest, targetRequest };
  };
}
