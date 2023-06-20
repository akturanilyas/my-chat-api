import { compare, genSalt, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import environment from '../builders/envBuilder';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { PasswordMismatchException } from '../exceptions/user/PasswordMismatchException';
import { UserAlreadyExistsException } from '../exceptions/user/UserAlreadyExistsException';
import { RegisterInterface } from './AuthService.interface';

export class AuthService {
  async register({ user }: { user: RegisterInterface }): Promise<User> {
    const userWithEmail: User | null = await User.findOne({
      where: { email: user.email },
    });

    if (userWithEmail) throw new UserAlreadyExistsException();

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
    if (!user) throw new UserNotFoundException();

    const validPass = await compare(password, user.password);
    if (!validPass) throw new PasswordMismatchException();

    return { ...user, token: jwt.sign({ id: user.id }, environment.jwt_token) };
  };

  getUserIdByToken = (token: string): string => {
    const jwtPayload = jwt.verify(token, process.env.SECRET_JWT as string);

    return jwtPayload.id;
  };
}
