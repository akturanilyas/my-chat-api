import { Not } from 'typeorm';
import { User } from '../models/User';
import { GetUserFilter } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { getUserIdByToken } from '../utils/commonUtil';

export class UserService {
  public getUser = async (filter: GetUserFilter): Promise<User | null> => {
    const user = await User.findOne({ where: { ...filter } });

    return user;
  };

  getSelf = async (token: string) => {
    const id = getUserIdByToken(token);

    if (!id) throw new UserNotFoundException();

    const user = await User.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    return user;
  };

  searchUsers = async (user_id?: string): Promise<Array<User>> => {
    const users = await User.find({
      where: {
        id: Not(getUserIdByToken(global.token)),
        friends: { friend_id: user_id || global.user_id },
      },
      relations: { friends: true },
    });

    return users;
  };
}
