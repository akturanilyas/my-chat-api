import { faker } from '@faker-js/faker';
import { describe } from '@jest/globals';
import * as assert from 'assert';
import request from 'supertest';
import { app } from '../../app';
import { ENDPOINT } from '../../constants/endpoint.constant';
import { connectionSource } from '../../server';
import { DatabaseService } from '../../services/databaseService';

describe('AuthController', () => {
  it('Check /register endpoint', async () => {
    await new DatabaseService(connectionSource).initialize();
    const params = {
      password: faker.internet.password(),
      username: faker.internet.userName(),
      first_name: faker.name.firstName(),
      email: faker.internet.email(),
      last_name: faker.name.lastName(),
      age: 12,
    };

    const res = await request(app)
      .post(`/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`)
      .send(params)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200)
  });

  it('check index page', async () => {
    const response = await request(app).get('/api');

    assert.strictEqual(response.status, 200);
  });
});