import { Chat } from '../models/Chat';
import { UsersChat } from '../models/UsersChat';
import { ChatAlreadyExist } from '../exceptions/chat/FriendRequestAlreadyExist';

export class ChatService {
  public getChats = async (): Promise<Array<UsersChat>> => {
    const usersChats = await UsersChat.find({
      where: { user_id: global.userId },
      relations: { chat: true, user: true, target: true },
    });

    return usersChats;
  };

  public getUserChats = async ({
    chat_id,
  }: {
    chat_id: string;
  }): Promise<Array<UsersChat>> => {
    const chat = await UsersChat.find({
      where: { chat_id },
      relations: { chat: true, user: true, target: true },
    });

    return chat;
  };

  public createChat = async ({
    targetId,
    targetType,
  }: {
    targetId: string;
    targetType: string;
  }): Promise<{
    chat: UsersChat;
    targetChat: UsersChat;
  }> => {
    const pairs = await this.getUsersChatsPair({
      targetId,
      targetType,
      userId: global.userId,
    });

    if (pairs.chat && pairs.targetChat) {
      return {
        chat: pairs.chat,
        targetChat: pairs.targetChat,
      };
    }

    const newChat = await Chat.create({}).save();

    await this.createChatUserPair({ chatId: newChat.id, targetId, targetType });

    const chat = await UsersChat.findOneOrFail({
      where: { chat_id: newChat.id },
      relations: { chat: true, user: true, target: true },
    });

    const targetChat = await UsersChat.findOneOrFail({
      where: { user_id: chat.target_id, target_id: chat.user_id },
      relations: { chat: true, user: true, target: true },
    });

    return { chat, targetChat };
  };

  public createChatUserPair = async ({
    chatId,
    targetId,
    targetType,
  }: {
    chatId: string;
    targetId: string;
    targetType: string;
  }) => {
    const isExist = await this.checkUsersChatIsExist({
      targetId,
      targetType,
      userId: global.userId,
    });

    if (isExist) throw new ChatAlreadyExist();

    const chat = await UsersChat.create({
      chat_id: chatId,
      target_type: targetType,
      target_id: targetId,
      user_id: global.userId,
    }).save();

    const targetChat = await UsersChat.create({
      chat_id: chatId,
      user_id: targetId,
      target_type: targetType,
      target_id: global.userId,
    }).save();

    return {
      chat,
      targetChat,
    };
  };

  public findChatUser = async ({
    chatId,
    targetId,
    targetType,
  }: {
    chatId: string;
    targetId: string;
    targetType: string;
  }) => {
    const chat = await UsersChat.create({
      chat_id: chatId,
      target_type: targetType,
      target_id: targetId,
    }).save();

    return chat;
  };

  public checkUsersChatIsExist = async ({
    targetId,
    targetType,
    userId,
  }: {
    targetId: string;
    targetType: string;
    userId: string;
  }) => {
    const chat = await UsersChat.findOne({
      where: {
        target_type: targetType,
        target_id: targetId,
        user_id: userId,
      },
    });

    return chat;
  };

  public getUsersChatsPair = async ({
    targetId,
    targetType,
    userId,
  }: {
    targetId: string;
    targetType: string;
    userId: string;
  }) => {
    const chat = await UsersChat.findOne({
      where: { user_id: userId, target_id: targetId, target_type: targetType },
      relations: { chat: true, user: true, target: true },
    });

    const targetChat = await UsersChat.findOne({
      where: { user_id: targetId, target_id: userId, target_type: targetType },
      relations: { chat: true, user: true, target: true },
    });

    return {
      chat,
      targetChat,
    };
  };
}
