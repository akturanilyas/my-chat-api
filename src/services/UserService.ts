import { Brackets } from 'typeorm';
import { User } from '../models/User';
import { GetUserFilter } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { getUserIdByToken } from '../utils/commonUtil';
import { databaseService } from '../server';
import { Friend } from '../models/Friend';

export class UserService {
  public getUser = async (filter: GetUserFilter): Promise<User | null> => {
    const user = await User.findOne({ where: { ...filter } });

    return user;
  };

  public getSelf = async (token?: string) => {
    const id = getUserIdByToken(token || global.token);

    if (!id) throw new UserNotFoundException();

    const user = await User.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    return user;
  };

  public searchUsers = async ({ name }: { name?: string }): Promise<Array<User>> => {
    const users = await databaseService.source
      .getRepository(User)
      .createQueryBuilder('users')
      .where('users.id != :id', { id: global.userId })
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
        { id: global.userId },
      )
      .getMany();

    return users;
  };
}
