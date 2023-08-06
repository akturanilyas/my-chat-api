import { compare, genSalt, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import environment from '../builders/envBuilder';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';
import { PasswordMismatchException } from '../exceptions/user/PasswordMismatchException';
import { UserAlreadyExistsException } from '../exceptions/user/UserAlreadyExistsException';
import { RegisterInterface } from './AuthService.interface';
import { serializeToken } from '../utils/commonUtil';
import { UnauthorizedException } from '../exceptions/user/UnauthorizedException';

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

  login = async ({ username, password }: { username: string; password: string }) => {
    const user = await User.findOneBy({ username });

    if (!user) throw new UserNotFoundException();

    const validPass = await compare(password, user.password);
    if (!validPass) throw new PasswordMismatchException();

    return {
      ...user,
      access_token: jwt.sign({ id: user.id }, environment.jwt_token as string),
    };
  };

  public checkToken = (token: string) => {
    let jwtPayload;

    try {
      const serializedToken = serializeToken(token);

      jwtPayload = jwt.verify(serializedToken, environment.jwt_token as string);

      const { id } = jwtPayload;
      const newToken = jwt.sign({ id }, environment.jwt_token as string, {});

      global.token = newToken;
      global.userId = id;

      return { userId: id, newToken, jwtPayload };
    } catch (error) {
      // If token is not valid, respond with 401 (unauthorized)
      throw new UnauthorizedException();
    }
  };
}
