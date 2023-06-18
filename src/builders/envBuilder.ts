import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const environment = {
  nodeEnv: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  jwt_token: process.env.JWT,
  debugEnabled: Boolean(process.env.DEBUG_ENABLED) || false,
};

export default environment;
