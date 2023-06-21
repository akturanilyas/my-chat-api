import 'dotenv/config';
import { DatabaseService } from './src/services/DatabaseService';

const database = new DatabaseService();

beforeAll(async () => {
  try {
    await database.initializeForTests();
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  console.log('database.closeDbSession()');
  await database.destroy();
});
