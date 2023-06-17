import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import environment from '../builders/envBuilder';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: environment.host,
  port: 3306,
  username: environment.username,
  password: environment.password,
  database: environment.database,
  synchronize: true,
  migrationsTableName: 'migrations',
  logging: environment.debugEnabled,
  logger: environment.logType,
  entities: ['src/models/**/*.ts', 'dist/models/**/*.js'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  dropSchema: false,
};

export default ormConfig;