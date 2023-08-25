import request from 'supertest';
import { app } from '../app';
import { AuthService } from '../services/AuthService';

type LoginScenarioDTO = {
  email: string;
  password: string;
  age?: number;
  last_name: string;
  first_name: string;
  username: string;
};

export const postRequest = async ({
  path,
  body,
  token = '',
}: {
  path: string;
  body: Record<string, unknown>;
  token?: string;
}) => {
  const response = await request(app)
    .post(path)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .auth(token, { type: 'bearer' });

  return response;
};

export const getRequest = async ({
  path,
  query,
  token = '',
}: {
  path: string;
  query?: Record<string, unknown>;
  token?: string;
}) => {
  const response = await request(app)
    .get(path)
    .query(query || {})
    .auth(token, { type: 'bearer' });

  return response;
};

export const loginScenario = async (user: LoginScenarioDTO) => {
  const authService = new AuthService();

  const _user = await authService.login({ ...user });
  global.token = _user.access_token;
  global.userId = _user.id;

  return _user;
};

export const registerScenario = async () => {
  //
};
