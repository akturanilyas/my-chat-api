import { Like } from 'typeorm';
import { Friend } from '../models/Friend';
import { FriendStatus } from '../enums/friendStatus';
import { FriendRequestNotFound } from '../exceptions/friend/FriendRequestNotFound';
import { FriendRequestAlreadyExist } from '../exceptions/friend/FriendRequestAlreadyExist';

export class FriendService {
  addFriend = async (userId: string) => {
    const request = await Friend.findOneBy({
      user_id: global.userId,
      receiver_id: userId,
    });

    if (request) {
      throw new FriendRequestAlreadyExist();
    }

    const friendRequest = Friend.create({
      status: FriendStatus.RECEIVED,
      receiver_id: userId,
      user_id: global.userId,
    });

    await friendRequest.save();

    const targetRequest = Friend.create({
      status: FriendStatus.SENT,
      user_id: userId,
      receiver_id: global.userId,
    });

    await targetRequest.save();

    return { friendRequest, targetRequest };
  };

  removeFriend = async (userId: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests({
      userId,
      status: FriendStatus.ACCEPTED,
    });

    await targetRequest?.softRemove();
    await friendRequest?.softRemove();

    return { friendRequest, targetRequest };
  };

  acceptFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests({
      id,
      status: FriendStatus.RECEIVED,
    });

    friendRequest.status = FriendStatus.ACCEPTED;
    await friendRequest.save();

    targetRequest.status = FriendStatus.ACCEPTED;
    await targetRequest.save();

    return {
      friendRequest,
      targetRequest,
    };
  };

  rejectFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests({
      id,
      status: FriendStatus.RECEIVED,
    });

    friendRequest.status = FriendStatus.REJECTED;
    await friendRequest.save();
    await friendRequest.softRemove();

    targetRequest.status = FriendStatus.REJECTED;
    await targetRequest.save();
    await targetRequest.softRemove();

    return friendRequest;
  };

  findFriendsRequests = async ({
    id,
    userId: user_id,
    status,
  }: {
    id?: string;
    userId?: string;
    status: FriendStatus;
  }) => {
    const friendRequest = await Friend.findOneBy({
      id,
      user_id,
      status,
    });

    if (!friendRequest) {
      throw new FriendRequestNotFound();
    }

    const targetRequest = await Friend.findOneBy({
      user_id: friendRequest?.receiver_id,
      receiver_id: friendRequest?.user_id,
      status:
        status === FriendStatus.RECEIVED ? FriendStatus.SENT : FriendStatus.RECEIVED,
    });

    if (!targetRequest) {
      throw new FriendRequestNotFound();
    }

    return { friendRequest, targetRequest };
  };

  getFriendRequests = async () => {
    const requests = await Friend.find({
      where: { receiver_id: global.userId, status: FriendStatus.RECEIVED },
      relations: { receiver: true, requester: true },
    });

    return requests;
  };

  getFriends = async ({ name }: { name?: string }) => {
    const friends = await Friend.find({
      where: {
        user_id: global.userId,
        status: FriendStatus.ACCEPTED,
        receiver: {
          first_name: name ? Like(`%${name}%`) : Like('%%'),
        },
      },
      relations: { requester: true, receiver: true },
    });

    return friends;
  };
}
