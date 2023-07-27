import { AbstractResource } from '../AbstractResource';
import { Message } from '../../models/Message';

export class MessageListResource extends AbstractResource {
  public toJson(resource: object): object {
    const messages = resource as Array<Message>;

    return messages.map(message => ({
      id: message.id,
    }));
  }
}
