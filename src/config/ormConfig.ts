import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import * as process from 'process';
import environment from '../builders/envBuilder';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: environment.username,
  password: environment.password,
  database: environment.database,
  synchronize: true,
  migrationsTableName: 'migrations',
  logging: true,
  entities: ['src/models/**/*.ts', 'dist/models/**/*.js'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  dropSchema: false,
};

export default ormConfig;
