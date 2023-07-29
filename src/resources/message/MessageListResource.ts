import { AbstractResource } from '../AbstractResource';
import { Message } from '../../models/Message';

export class MessageListResource extends AbstractResource {
  public toJson(resource: object): object {
    const messages = resource as Array<Message>;

    return messages.map(message => ({
      id: message.id,
      sender_id: message.sender_id,
      sender: { id: message.sender_id, name: message.sender.getFullName() },
      chat_id: message.chat_id,
    }));
  }
}
