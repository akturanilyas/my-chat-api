import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

enum loggerType {
    'advanced-console',
    'simple-console',
    'file',
    'debug',
}


const environment = {
  nodeEnv: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  debugEnabled: Boolean(process.env.DEBUG_ENABLED) || false,
  logType: process.env.LOG_TYPE || loggerType.file,
};

export default environment;