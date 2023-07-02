import { describe } from '@jest/globals';
import { ENDPOINT } from '../../constants/endpoint.constant';
import { getRequest } from '../../utils/testUtils';
import { AuthService } from '../../services/AuthService';

describe('UserController', () => {
  it('check login endpoint', async () => {
    const authService = new AuthService();

    const userParams = {
      email: 'test@gmail.com',
      password: 'password',
      age: 12,
      last_name: 'last_name',
      first_name: 'first_name',
      username: 'username',
    };

    await authService.register({
      user: userParams,
    });

    const loginRes = await authService.login({ ...userParams });

    const res = await getRequest({
      path: `/api${ENDPOINT.SELF}`,
      token: loginRes.access_token,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      age: userParams.age,
      created_at: loginRes.created_at.toISOString(),
      deleted_at: loginRes.deleted_at,
      email: loginRes.email,
      first_name: loginRes.first_name,
      id: loginRes.id,
      last_name: loginRes.last_name,
      password: loginRes.password,
      updated_at: loginRes.updated_at.toISOString(),
      username: loginRes.username,
    });
  });
});
