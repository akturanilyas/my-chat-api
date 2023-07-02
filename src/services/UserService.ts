import * as jwt from 'jsonwebtoken';
import { trimStart } from 'lodash';
import { User } from '../models/User';
import { GetUserInterface } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';

export class UserService {
  public getUser = async (filter: GetUserInterface): Promise<User | null> => {
    const user = await User.findOne({ where: { ...filter } });

    return user;
  };

  getSelf = async (token: string) => {
    const id = this.getUserIdByToken(token);

    if (!id) throw new UserNotFoundException();

    const user = await User.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    return user;
  };

  getUserIdByToken = (token: string): string | null => {
    if (token.startsWith('Bearer ')) {
      const token2 = trimStart(trimStart(token, 'Bearer'));

      return jwt.verify(token2, process.env.JWT as string)?.id;
    }

    return jwt.verify(token, process.env.JWT as string)?.id;
  };
}
