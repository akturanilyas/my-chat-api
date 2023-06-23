import { User } from '../models/User';

export class UserService {
  private getFriends = async (): Promise<User> => {
    const user = new User();

    return user;
  };
}
