import 'dotenv/config';
import { DatabaseService } from './src/services/DatabaseService';
import { databaseService } from './src/server';

beforeAll(async () => {
  try {
    await databaseService.initializeForTests();
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await databaseService.destroy();
});
