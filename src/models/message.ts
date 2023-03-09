import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractModel } from './abstractModel';
import { Chat } from './chat';

@Entity('messages')
export class Message extends AbstractModel {
  @Column({ type: 'int' })
  sender_id: number;

  @Column({ type: 'int' })
  chat_id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: Chat;
}
