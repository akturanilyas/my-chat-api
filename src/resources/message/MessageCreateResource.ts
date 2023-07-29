import { AbstractResource } from '../AbstractResource';
import { Message } from '../../models/Message';

export class MessageCreateResource extends AbstractResource {
  public toJson(resource: object): object {
    const messages = resource as Message;

    return {
      id: messages.id,
    };
  }
}
