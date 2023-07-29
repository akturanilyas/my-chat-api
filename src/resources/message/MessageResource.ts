import { AbstractResource } from '../AbstractResource';
import { Message } from '../../models/Message';

export class MessageResource extends AbstractResource {
  public toJson(resource: object): object {
    const message = resource as Message;

    return {
      id: message.id,
      sender: { id: message.sender_id, name: message.sender.getFullName() },
      chat_id: message.chat_id,
      text: message.text,
    };
  }
}
