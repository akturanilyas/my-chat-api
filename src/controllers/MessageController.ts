import { Request } from 'express';
import AbstractController from './BaseController';
import { MessageService } from '../services/MessageService';
import { MessageListResource } from '../resources/message/MessageListResource';
import { MessageCreateResource } from '../resources/message/MessageCreateResource';

export default class MessageController extends AbstractController {
  public async index(req: Request): Promise<MessageListResource> {
    const { id } = req.params;

    const service = new MessageService();

    const messages = await service.getMessages({ chat_id: id });

    return new MessageListResource({ resource: messages });
  }

  public async store(req: Request): Promise<MessageCreateResource> {
    const { id } = req.params;
    const { text } = req.body;

    const service = new MessageService();

    const message = await service.createMessage({
      chatId: id,
      text,
    });

    return new MessageCreateResource({ resource: message });
  }
}
