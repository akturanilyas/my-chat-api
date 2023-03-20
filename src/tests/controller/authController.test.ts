import request from 'supertest';
import { assert } from 'chai';
import server, { app } from '../../server';
import { ENDPOINT } from '../../constants/endpoint.constant';

describe('AuthController', () => {
  it('Check /register endpoint', async () => {
    const res = await request(app).post(`/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`);

    await assert(res.statusCode, '200');
  });

  it('check index page', async () => {
    const response = await request(server).get('/').timeout(3000);

    assert.strictEqual(response.status, 200);
  });
});
