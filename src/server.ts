import express, { Request, Response } from 'express';
import environment from './builders/env.builder';

export const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

const httpServer = app
  .listen(environment.port, () => {
    //
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
