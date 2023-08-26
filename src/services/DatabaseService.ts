import { DataSource } from 'typeorm';
import { ormConfig, testOrmConfig } from '../config/ormConfig';

export class DatabaseService {
  public source: DataSource;

  public async initialize(): Promise<void> {
    this.source = new DataSource(ormConfig);
    await this.source.initialize();
  }

  public async initializeForTests(): Promise<void> {
    try {
      this.source = new DataSource(testOrmConfig);
      await this.source.initialize();
      console.log(`In memory Db initialized`);
    } catch (err) {
      console.error(`Error: ${(err as Error).message}`);
    }
  }

  public clearDatabase = async () => {
    await this.source.dropDatabase();
  };

  public destroy = async () => {
    await this.source.destroy();
  };
}
