import { AbstractResource } from '../AbstractResource';
import { UsersChat } from '../../models/UsersChat';

export class ChatResource extends AbstractResource {
  public toJson(resource: object): object {
    const userChat = resource as UsersChat;

    return {
      id: userChat.chat_id,
      user: {
        name: userChat.user.getFullName(),
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
      target: {
        name: userChat.user.getFullName(),
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
      target_id: userChat.target_id,
      target_type: userChat.target_type,
      message: 'tempMessage',
      time: '20:24',
    };
  }
}
