import { Message } from '../models/Message';
import { Chat } from '../models/Chat';

export class MessageService {
  public getMessages = async ({
    targetId,
    targetType,
  }: {
    targetId: string;
    targetType: string;
  }): Promise<Array<Message>> => {
    const chat = await Chat.findOneOrFail({
      where: { target_id: targetId, target_type: targetType },
    });

    const messages = await Message.find({
      where: { id: chat.id },
    });

    return messages;
  };

  public createMessage = async ({
    chatId,
    text,
  }: {
    chatId: string;
    text: string;
  }): Promise<Message> => {
    const _message = Message.create({ text, chat_id: chatId, sender_id: global.user_id });

    await _message.save();

    return _message;
  };
}
