import { DataSource } from 'typeorm';
import socket from './socket';
import jobs from './jobs';
import { DatabaseService } from './services/databaseService';
import httpServer, { app } from './server';
import ormConfig from './config/orm.config';
import { routeBuilder } from './builders/route.builder';

const connectionSource: DataSource = new DataSource(ormConfig);

(async () => {
  await new DatabaseService(connectionSource).initialize();
  await routeBuilder(app);
  await httpServer;
  await socket();
  await jobs();
})();

export default connectionSource;
