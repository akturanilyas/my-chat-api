import { faker } from '@faker-js/faker';
import { describe } from '@jest/globals';
import { ENDPOINT } from '../../constants/endpoint.constant';
import { postRequest } from '../../utils/testUtils';

describe('AuthController', () => {
  it('Check /register endpoint', async () => {
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

    await postRequest({
      body: registerParams,
      path: `/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`,
    });

    const params = {
      password,
      email,
    };

    const res = await postRequest({
      body: params,
      path: `/api${ENDPOINT.AUTH}${ENDPOINT.LOGIN}`,
    });

    expect(res.statusCode).toBe(201);
  });
});
