import request from 'supertest';
import { app } from '../app';

export const postRequest = async ({
  path,
  body,
}: {
  path: string;
  body: Record<string, unknown>;
}) => {
  const response = await request(app)
    .post(path)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

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
