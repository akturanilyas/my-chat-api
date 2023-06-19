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
