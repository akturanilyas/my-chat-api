import { BadRequest, Unauthorized } from '@curveball/http-errors';
import { compare, genSalt, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
import environment from '../builders/envBuilder';

type RegisterInterface = {
  password: string;
  username: string;
  first_name: string;
  email: string;
  last_name: string;
  age: number;
};

export class AuthService {
  async register({ user }: { user: RegisterInterface }): Promise<User> {
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

  login = async ({ email, password }: { email: string; password: string }) => {
    const user = await User.findOneBy({ email });
    if (!user) throw new Unauthorized('Kullanici bulunamadi');

    const validPass = await compare(password, user.password);
    if (!validPass) throw new Unauthorized('Şifre veya E-mail yanlış');

    return { ...user, token: jwt.sign({ id: user.id }, environment.jwt_token) };
  };

  getUserIdByToken = (token: string): string => {
    const jwtPayload = jwt.verify(token, process.env.SECRET_JWT as string);

    return jwtPayload.id;
  };
}
