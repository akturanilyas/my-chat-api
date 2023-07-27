import { Chat } from '../models/Chat';
import { User } from '../models/User';
import { ChatAlreadyExist } from '../exceptions/chat/FriendRequestAlreadyExist';

export class ChatService {
  public getChats = async (): Promise<Array<Chat>> => {
    const chats = await Chat.find({ where: { user_id: global.user_id } });

    return chats;
  };

  public createChat = async ({
    targetId,
    targetType,
  }: {
    targetId: string;
    targetType: string;
  }) => {
    // TODO If else condition
    await User.findOneOrFail({ where: { id: targetId } });

    let chat = await Chat.findOneBy({
      target_type: targetType,
      target_id: targetId,
      user_id: global.user_id,
    });

    if (chat) {
      throw new ChatAlreadyExist();
    }

    chat = await Chat.create({
      target_type: targetType,
      target_id: targetId,
      user_id: global.user_id,
    }).save();

    return chat;
  };
}
