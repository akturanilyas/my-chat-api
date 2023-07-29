import * as console from 'console';
import environment from './builders/envBuilder';
import { app } from './app';
import jobs from './jobs';
import socketBuilder from './socketBuilder';
import { EnvironmentType } from './enums/environmentType';
import { DatabaseService } from './services/DatabaseService';

export const databaseService: DatabaseService = new DatabaseService();

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
  if (environment.nodeEnv === EnvironmentType.DEVELOPMENT) {
    await databaseService.initialize();
  }

  await httpServer;
  await socketBuilder();
  jobs();
})();

export default httpServer;
