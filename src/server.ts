import * as console from 'console';
import { DataSource } from 'typeorm';
import environment from './builders/envBuilder';
import { app } from './app';
import ormConfig from './config/ormConfig';
import jobs from './jobs';
import { DatabaseService } from './services/databaseService';
import socket from './socket';

export const connectionSource: DataSource = new DataSource(ormConfig);

const httpServer = app
  .listen(environment.port, async () => {
    console.log(`listening on port ${environment.port}`);
  }) //   Fix the Error EADDRINUSE
  .on('error', () => {
    process.once('SIGUSR2', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
    process.on('SIGINT', () => {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, 'SIGINT');
    });
    process.on('uncaughtException', err => {
      console.log(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });
  });

(async () => {
  await new DatabaseService(connectionSource).initialize();
  await httpServer;
  await socket();
  await jobs();
})();

export default httpServer;
