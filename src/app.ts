import cors from 'cors';
import express, { Request, Response } from 'express';
import { routeBuilder } from './builders/routeBuilder';
import { errorHandler, notFoundError } from './middlewares/errors.middleware';

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.get(`/api`, (req: Request, res: Response) => {
  res.send('Hello world');
});

routeBuilder(app).then(() => {
  app.use(notFoundError);
  app.use(errorHandler);
});
