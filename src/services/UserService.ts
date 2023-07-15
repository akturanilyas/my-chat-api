import { Brackets } from 'typeorm';
import { User } from '../models/User';
import { GetUserFilter } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { getUserIdByToken } from '../utils/commonUtil';
import { databaseService } from '../server';
import { Friend } from '../models/Friend';
import { FriendStatus } from '../enums/friendStatus';
import { FriendRequestNotFound } from '../exceptions/friend/FriendRequestNotFound';

export class UserService {
  public getUser = async (filter: GetUserFilter): Promise<User | null> => {
    const user = await User.findOne({ where: { ...filter } });

    return user;
  };

  getSelf = async (token?: string) => {
    const id = getUserIdByToken(token || global.token);

    if (!id) throw new UserNotFoundException();

    const user = await User.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    return user;
  };

  searchUsers = async ({ name }: { name?: string }): Promise<Array<User>> => {
    const users = await databaseService.source
      .getRepository(User)
      .createQueryBuilder('users')
      .where('users.id != :id', { id: global.user_id })
      .andWhere(
        new Brackets(qb => {
          qb.where('users.first_name LIKE :search', { search: `%${name || ''}%` });
          qb.orWhere('users.last_name LIKE :search', { search: `%${name || ''}%` });
        }),
      )
      .leftJoinAndMapOne(
        'users.friend',
        Friend,
        'friends',
        'friends.receiver_id = users.id and friends.user_id = :id',
        { id: global.user_id },
      )
      .getMany();

    return users;
  };

  addFriend = async (user_id: string) => {
    const friend = Friend.create({
      status: FriendStatus.PENDING,
      receiver_id: user_id,
      user_id: global.user_id,
    });

    await friend.save();

    const targetFriend = Friend.create({
      status: FriendStatus.PENDING,
      user_id,
      receiver_id: global.user_id,
    });

    await targetFriend.save();

    return { friend, targetFriend };
  };

  removeFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    await targetRequest?.softRemove();
    await friendRequest?.softRemove();
  };

  acceptFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    friendRequest.status = FriendStatus.ACCEPTED;
    await friendRequest.save();

    targetRequest.status = FriendStatus.ACCEPTED;
    await targetRequest.save();
  };

  declineFriend = async (id: string) => {
    const { friendRequest, targetRequest } = await this.findFriendsRequests(id);

    friendRequest.status = FriendStatus.REJECTED;
    await friendRequest.save();

    targetRequest.status = FriendStatus.REJECTED;
    await targetRequest.save();
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
