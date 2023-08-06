import { Server } from 'socket.io';
import httpServer from './server';
import { MessageService } from './services/MessageService';
import { MessageResource } from './resources/message/MessageResource';
import { AuthService } from './services/AuthService';
import { ChatService } from './services/ChatService';

const socketBuilder = async (): Promise<void> => {
  const io = new Server(httpServer);

  io.on('connection', socket => {
    socket.on('messageSent', async args => {
      try {
        const authService = new AuthService();
        const messageService = new MessageService();
        const chatService = new ChatService();

        authService.checkToken(socket.handshake.auth.token);

        const { chatId, text } = args;

        const message = await messageService.createMessage({ chatId, text });

        const resource = new MessageResource({ resource: message });

        const userChats = await chatService.getUserChats({ chat_id: chatId });

        userChats.map(chat =>
          socket.broadcast.emit(`messageListen-${chat.user_id}`, resource),
        );
      } catch (e) {
        console.log(e);
      }
    });
  });
};

export default socketBuilder;
