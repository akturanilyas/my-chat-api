import { User } from '../models/User';
import { GetUserInterface } from './UserService.interface';

export class UserService {
  public getUser = async (filter: GetUserInterface): Promise<User | null> => {
    const user = await User.findOne({ where: { ...filter } });

    return user;
  };
}
