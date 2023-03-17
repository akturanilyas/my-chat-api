import { BadRequest } from '@curveball/http-errors';
import { genSalt, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';

type UserDto = {
  password: string;
  username: string;
  first_name: string;
  email: string;
  last_name: string;
  age: number;
};

export class AuthService {
  async register({ user }: { user: UserDto }): Promise<User> {
    const userWithEmail: User | null = await User.findOne({
      where: { email: user.email },
    });

    if (userWithEmail) throw new BadRequest('Bu kullanici zaten var');

    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    const registeredUser: User = await User.create({
      ...user,
      password: hashedPassword,
    }).save();

    return registeredUser;
  }

  getUserIdByToken = (token: string): string => {
    const jwtPayload = jwt.verify(token, process.env.SECRET_JWT as string);

    return jwtPayload.id;
  };
}
