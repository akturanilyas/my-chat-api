import { Chat } from '../models/Chat';
import { UsersChat } from '../models/UsersChat';

export class ChatService {
  public getChats = async (): Promise<Array<Chat>> => [];

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
      user_id: global.user_id,
    }).save();

    const targetChat = await UsersChat.create({
      chat_id: chatId,
      user_id: targetId,
      target_type: targetType,
      target_id: global.user_id,
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
