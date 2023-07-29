import { Message } from '../models/Message';
import { Chat } from '../models/Chat';

export interface GetMessageInterface {
  id?: string;
  target_id?: string;
  target_type?: string;
}

export class MessageService {
  public getMessages = async (filter: GetMessageInterface): Promise<Array<Message>> => {
    const chat = await Chat.findOneOrFail({
      where: filter,
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
    const _message = Message.create({ text, chat_id: chatId, sender_id: global.userId });

    await _message.save();

    return _message;
  };
}
