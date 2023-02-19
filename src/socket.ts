import { Server } from 'socket.io';
import httpServer from './server';

const socket = async (): Promise<void> => {
  const io = new Server(httpServer);
};

export default socket;
