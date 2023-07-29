import { Chat } from '../models/Chat';
import { UsersChat } from '../models/UsersChat';

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
  }) => {
    const chat = await Chat.create({}).save();

    await this.createChatUserPair({ chatId: chat.id, targetId, targetType });

    return chat;
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
}
