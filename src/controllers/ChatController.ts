import { Request, Response } from 'express';
import BaseController from './BaseController';
import { ChatService } from '../services/ChatService';
import { ChatListResource } from '../resources/chat/ChatListResource';

export default class ChatController extends BaseController {
  static async chats(req: Request, res: Response): Promise<Response> {
    const chats = await new ChatService().getChats();

    const resource = new ChatListResource({ resource: chats });

    return res.status(200).json(resource);
  }

  static createChat = async (req: Request, res: Response) => {
    const { targetId, targetType } = req.body;

    const chat = await new ChatService().createChat({ targetId, targetType });

    return res.status(200).json(chat);
  };
}
