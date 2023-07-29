import { Message } from '../models/Message';

export interface GetMessageInterface {
  chat_id?: string;
  target_id?: string;
  target_type?: string;
}

export class MessageService {
  public getMessages = async (filter: GetMessageInterface): Promise<Array<Message>> => {
    const messages = await Message.find({
      where: filter,
      relations: { sender: true, chat: true },
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
    const message = Message.create({ text, chat_id: chatId, sender_id: global.userId });

    await message.save();

    return message;
  };
}
