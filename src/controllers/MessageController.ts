import { Request, Response } from 'express';
import AbstractController from './BaseController';
import { MessageService } from '../services/MessageService';
import { MessageListResource } from '../resources/message/MessageListResource';
import { MessageCreateResource } from '../resources/message/MessageCreateResource';

export default class MessageController extends AbstractController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    const service = new MessageService();

    const messages = await service.getMessages(user_id);

    const resource = new MessageListResource({ resource: messages });

    return res.status(201).json(resource);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    const service = new MessageService();

    const message = await service.createMessage(user_id);

    const resource = new MessageCreateResource({ resource: message });

    return res.status(201).json(resource);
  }
}
