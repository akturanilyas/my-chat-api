import { User } from '../models/User';
import { GetUserFilter } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { getUserIdByToken } from '../utils/commonUtil';
import { connectionSource } from '../server';

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
    const users = await connectionSource.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id != :id', { id: global.user_id })
      .where(qb => {
        qb.orWhere('user.first_name LIKE :search', { search: `%${name}%` }).orWhere(
          'user.last_name LIKE :search',
          { search: `%${name}%` },
        );
      })
      .getMany();
    console.log(users);
    return users;
  };
}
