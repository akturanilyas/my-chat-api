import express, { Request, Response } from 'express';
import * as console from 'console';
import environment from './builders/envBuilder';
import { routeBuilder } from './builders/routeBuilder';

export const app = express();
app.get(`/api`, (req: Request, res: Response) => {
  res.send('Hello world');
});

const httpServer = app
  .listen(environment.port, async () => {
    await routeBuilder(app);
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
  });

export default httpServer;
