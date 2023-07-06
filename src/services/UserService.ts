import * as jwt from 'jsonwebtoken';
import { trimStart } from 'lodash';
import { Not } from 'typeorm';
import { User } from '../models/User';
import { GetUserInterface } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import environment from '../builders/envBuilder';

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

  getUserIdByToken = (token: string): string => {
    if (token.startsWith('Bearer ')) {
      return jwt.verify(
        trimStart(trimStart(token, 'Bearer')),
        process.env.jwt_token as string,
      )?.id;
    }

    return jwt.verify(token, environment.jwt_token as string)?.id;
  };

  searchUsers = async (): Promise<Array<User>> => {
    const users = await User.find({
      where: { id: Not(this.getUserIdByToken(global.token)) },
    });

    return users;
  };
}
