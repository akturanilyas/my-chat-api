import { describe, expect } from '@jest/globals';
import { AuthService } from '../../services/AuthService';
import { FriendService } from '../../services/FriendService';
import { loginScenario } from '../../utils/testUtils';
import { Friend } from '../../models/Friend';
import { FriendRequestAlreadyExist } from '../../exceptions/friend/FriendRequestAlreadyExist';

describe('UserService', () => {
  let user1Response;
  let user2Response;

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
    user1Response = await service.register({ user });
    user2Response = await service.register({ user: user2 });
  });

  it('Check addFriend method', async () => {
    await loginScenario(user);

    const res = await new FriendService().addFriend(user2Response.id);

    expect(res).toBeInstanceOf(Object);
  });

  it('Check remove method', async () => {
    await loginScenario(user2);
    expect(await Friend.find()).toHaveLength(2);

    const res = await new FriendService().removeFriend(user2Response.id);

    expect(await Friend.find()).toHaveLength(0);
    expect(res).toBeInstanceOf(Object);
  });
});
