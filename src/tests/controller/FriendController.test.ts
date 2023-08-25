import { describe } from '@jest/globals';
import { ENDPOINT } from '../../constants/endpoint.constant';
import { loginScenario, postRequest } from '../../utils/testUtils';
import { AuthService } from '../../services/AuthService';

describe('FriendController', () => {
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

  it('check addFriend endpoint', async () => {
    const service = new AuthService();
    await service.register({ user });
    const user2Response = await service.register({ user: user2 });

    await loginScenario(user);

    const res = await postRequest({
      path: `/api${ENDPOINT.FRIENDS}${ENDPOINT.ADD}`,
      body: { user_id: user2Response.id },
      token: global.token,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});
