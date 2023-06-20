import { faker } from '@faker-js/faker';
import { describe } from '@jest/globals';
import request from 'supertest';
import { app } from '../../app';
import { ENDPOINT } from '../../constants/endpoint.constant';
import { connectionSource } from '../../server';
import { postRequest } from '../../utils/testUtils';
import { DatabaseService } from '../../services/DatabaseService';

describe('AuthController', () => {
  it('Check /register endpoint', async () => {
    await new DatabaseService(connectionSource).initialize();
    const params = {
      password: faker.internet.password(),
      username: faker.internet.userName(),
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      last_name: faker.person.lastName(),
      age: 12,
    };

    const res = await postRequest({
      body: params,
      path: `/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`,
    });

    expect(res.statusCode).toBe(201);
  });

  it('check login endpoint', async () => {
    await new DatabaseService(connectionSource).initialize();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const registerParams = {
      password,
      username: faker.internet.userName(),
      first_name: faker.person.firstName(),
      email,
      last_name: faker.person.lastName(),
      age: 12,
    };

    await request(app)
      .post(`/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`)
      .send(registerParams)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const params = {
      password,
      email,
    };

    const res = await postRequest({
      body: params,
      path: `/api${ENDPOINT.AUTH}${ENDPOINT.LOGIN}`,
    });

    expect(res.text).toBe(201);
  });
});
