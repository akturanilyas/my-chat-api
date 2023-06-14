import { faker } from '@faker-js/faker';
import { describe, expect, test } from '@jest/globals';
import { User } from '../../models/user';
import { connectionSource } from '../../server';
import { AuthService } from '../../services/authService';
import { DatabaseService } from '../../services/databaseService';

describe('AuthService', () => {
  const service = new DatabaseService(connectionSource);
  beforeAll(async () => {
    await service.initialize();
  });

  test('Check /register service', async () => {
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
});