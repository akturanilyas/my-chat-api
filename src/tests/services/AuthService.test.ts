import { faker } from '@faker-js/faker';
import { describe, expect } from '@jest/globals';
import { User } from '../../models/User';
import { AuthService } from '../../services/AuthService';

describe('AuthService', () => {
  it('Check /register service', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: 12,
      last_name: faker.person.lastName(),
      first_name: faker.person.firstName(),
      username: faker.internet.userName(),
    };

    const res = await new AuthService().register({ user });

    await expect(res).toBeInstanceOf(User);
  });

  it('Check /login service', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: 12,
      last_name: faker.person.lastName(),
      first_name: faker.person.firstName(),
      username: faker.internet.userName(),
    };

    await new AuthService().register({ user });

    const res = await new AuthService().login({ ...user });

    await expect(res.first_name).toBe(user.first_name);
    await expect(res.last_name).toBe(user.last_name);
    await expect(res.email).toBe(user.email);
  });
});
