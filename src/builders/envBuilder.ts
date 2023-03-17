import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const environment = {
  nodeEnv: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

export default environment;
