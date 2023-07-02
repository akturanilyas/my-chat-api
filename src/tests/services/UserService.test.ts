import { describe, expect } from '@jest/globals';
import { User } from '../../models/User';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';

describe('UserService', () => {
  const user = {
    email: 'test@gmail.com',
    password: 'password',
    age: 12,
    last_name: 'last_name',
    first_name: 'first_name',
    username: 'username',
  };

  beforeAll(async () => {
    await new AuthService().register({ user });
  });

  it('Check /getUser method by email', async () => {
    const res: User | null = await new UserService().getUser({ email: user.email });

    await expect(res).toBeInstanceOf(User);
    await expect(res?.email).toBe(user.email);
    await expect(res?.age).toBe(user.age);
    await expect(res?.last_name).toBe(user.last_name);
    await expect(res?.first_name).toBe(user.first_name);
    await expect(res?.username).toBe(user.username);
  });

  it('Check /getUser method by age', async () => {
    const res: User | null = await new UserService().getUser({ age: user.age });

    await expect(res).toBeInstanceOf(User);
    await expect(res?.email).toBe(user.email);
    await expect(res?.age).toBe(user.age);
    await expect(res?.last_name).toBe(user.last_name);
    await expect(res?.first_name).toBe(user.first_name);
    await expect(res?.username).toBe(user.username);
  });

  it('Check /getUser method by last_name', async () => {
    const res: User | null = await new UserService().getUser({
      last_name: user.last_name,
    });

    await expect(res).toBeInstanceOf(User);
    await expect(res?.email).toBe(user.email);
    await expect(res?.age).toBe(user.age);
    await expect(res?.last_name).toBe(user.last_name);
    await expect(res?.first_name).toBe(user.first_name);
    await expect(res?.username).toBe(user.username);
  });

  it('Check /getUserIdByToken method', async () => {
    const authService = new AuthService();
    const userService = new UserService();

    const _user = await authService.login({ ...user });

    const res = await userService.getUserIdByToken(_user.access_token);

    await expect(res).toBe(_user.id);
  });

  it('Check /getUserIdByToken method', async () => {
    const authService = new AuthService();
    const userService = new UserService();

    const _user = await authService.login({ ...user });
    const res = await userService.getUserIdByToken(`Bearer ${_user.access_token}`);

    await expect(res).toBe(_user.id);
  });

  it('Check /getSelf method', async () => {
    const authService = new AuthService();
    const userService = new UserService();

    const _user = await authService.login({ ...user });

    const res = await userService.getSelf(`Bearer ${_user.access_token}`);

    await expect(res).toBeInstanceOf(User);
  });
});
