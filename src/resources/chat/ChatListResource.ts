import { AbstractResource } from '../AbstractResource';
import { Chat } from '../../models/Chat';

export class ChatListResource extends AbstractResource {
  public toJson(resource: object): object {
    const chats = resource as Array<Chat>;

    return chats.map(chat => ({
      id: chat.id,
      created_at: chat.created_at,
      updated_at: chat.updated_at,
      deleted_at: chat.deleted_at,
      type: chat.type,
      user_id: chat.user_id,
      target_id: chat.target_id,
      target_type: chat.target_type,
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      message: 'tempMessage',
      time: '20:24',
    }));
  }
}
