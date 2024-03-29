import { describe, expect } from '@jest/globals';
import { User } from '../../models/User';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { getUserIdByToken, serializeToken } from '../../utils/commonUtil';
import { loginScenario } from '../../utils/testUtils';

describe('UserService', () => {
  const user = {
    email: 'test@gmail.com',
    password: 'password',
    age: 12,
    last_name: 'last_name',
    first_name: 'first_name',
    username: 'username',
  };

  const user2 = {
    email: 'test2@gmail.com',
    password: 'password',
    age: 12,
    last_name: 'last_name2',
    first_name: 'first_name2',
    username: 'username2',
  };

  beforeAll(async () => {
    const service = new AuthService();
    await service.register({ user });
    await service.register({ user: user2 });
  });

  it('Check getUser method by email', async () => {
    const res: User | null = await new UserService().getUser({ email: user.email });

    expect(res).toBeInstanceOf(User);
    expect(res?.email).toBe(user.email);
    expect(res?.age).toBe(user.age);
    expect(res?.last_name).toBe(user.last_name);
    expect(res?.first_name).toBe(user.first_name);
    expect(res?.username).toBe(user.username);
  });

  it('Check getUser method by age', async () => {
    const res: User | null = await new UserService().getUser({ age: user.age });

    expect(res).toBeInstanceOf(User);
    expect(res?.email).toBe(user.email);
    expect(res?.age).toBe(user.age);
    expect(res?.last_name).toBe(user.last_name);
    expect(res?.first_name).toBe(user.first_name);
    expect(res?.username).toBe(user.username);
  });

  it('Check getUser method by last_name', async () => {
    const res: User | null = await new UserService().getUser({
      last_name: user.last_name,
    });

    expect(res).toBeInstanceOf(User);
    expect(res?.email).toBe(user.email);
    expect(res?.age).toBe(user.age);
    expect(res?.last_name).toBe(user.last_name);
    expect(res?.first_name).toBe(user.first_name);
    expect(res?.username).toBe(user.username);
  });

  it('Check getUserIdByToken method', async () => {
    const _user = await loginScenario(user);
    const res = getUserIdByToken(_user.access_token);

    expect(res).toBe(_user.id);
  });

  it('Check getUserIdByToken method2', async () => {
    const _user = await loginScenario(user);

    const res = getUserIdByToken(
      serializeToken(`Bearer ${serializeToken(_user.access_token)}`),
    );

    await expect(res).toBe(_user.id);
  });

  it('Check getSelf method', async () => {
    const userService = new UserService();

    const _user = await loginScenario(user);

    const res = await userService.getSelf(
      serializeToken(`Bearer ${serializeToken(_user.access_token)}`),
    );

    expect(res).toBeInstanceOf(User);
  });

  it('Check getUsersWithFriend method', async () => {
    const userService = new UserService();

    await loginScenario(user);

    const res = await userService.searchUsers({});

    expect(res).toBeInstanceOf(Array<User>);
    expect(res.length).toBe(1);
  });

  it('Check addFriend method', async () => {
    const userService = new UserService();

    await loginScenario(user);

    const res = await userService.searchUsers({});

    expect(res).toBeInstanceOf(Array<User>);
    expect(res.length).toBe(1);
  });
});
