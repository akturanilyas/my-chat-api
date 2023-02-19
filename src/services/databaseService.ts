import { DataSource } from 'typeorm';

export class DatabaseService {
  source: DataSource;

  constructor(connectionSource: DataSource) {
    this.source = connectionSource;
  }

  public async initialize(): Promise<void> {
    await this.source.initialize();
  }

  public async destroy(): Promise<void> {
    await this.source.destroy();
  }
}
