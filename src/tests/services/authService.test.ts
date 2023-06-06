import { beforeEach } from 'node:test';
import { describe, expect, test } from '@jest/globals';
import { AuthService } from '../../services/authService';
import { DatabaseService } from '../../services/databaseService';
import connectionSource from '../../app';

describe('AuthService', () => {
  beforeAll(async () => {
    await new DatabaseService(connectionSource).initialize();
  });

  test('Check /register service', async () => {
    const user = {
      email: 'email3@gmail.com',
      password: 'password123.',
      age: 12,
      last_name: 'lastname',
      first_name: 'firstname',
      username: 'username',
    };

    const res = await new AuthService().register({
      user,
    });

    await expect(res).toBe(200);
  });
});
