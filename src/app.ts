import { DataSource } from 'typeorm';
import socket from './socket';
import jobs from './jobs';
import { DatabaseService } from './services/databaseService';
import httpServer, { app } from './server';
import { routeBuilder } from './builders/routeBuilder';
import ormConfig from './config/ormConfig';

const connectionSource: DataSource = new DataSource(ormConfig);

(async () => {
  await new DatabaseService(connectionSource).initialize();
  await httpServer;
  await socket();
  await jobs();
})();

export default connectionSource;
