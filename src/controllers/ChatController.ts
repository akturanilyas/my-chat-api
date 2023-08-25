import { Request } from 'express';
import BaseController from './BaseController';
import { ChatService } from '../services/ChatService';
import { ChatListResource } from '../resources/chat/ChatListResource';
import { ChatResource } from '../resources/chat/ChatResource';

export default class ChatController extends BaseController {
  public static async chats(): Promise<ChatListResource> {
    const chats = await new ChatService().getChats();

    return new ChatListResource({ resource: chats });
  }

  public static createChat = async (req: Request) => {
    const { id: targetId, targetType } = req.body;

    const { chat } = await new ChatService().createChat({ targetId, targetType });

    return new ChatResource({ resource: chat });
  };
}
