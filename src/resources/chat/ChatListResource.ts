import { last } from 'lodash';
import { AbstractResource } from '../AbstractResource';
import { UsersChat } from '../../models/UsersChat';

export class ChatListResource extends AbstractResource {
  public toJson(resource: object): object {
    const usersChats = resource as Array<UsersChat>;

    return usersChats.map(userChat => ({
      id: userChat.chat_id,
      user: {
        name: userChat.user.getFullName(),
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
      target: {
        name: userChat.target.getFullName(),
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
      target_id: userChat.target_id,
      target_type: userChat.target_type,
      message: {
        text: last(userChat.chat.messages)?.text,
        time: last(userChat.chat.messages)?.created_at,
      },
    }));
  }
}
