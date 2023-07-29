import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { Chat } from './Chat';
import { User } from './User';

@Entity('messages')
export class Message extends AbstractModel {
  @Column({ type: 'varchar', length: 40 })
  sender_id: string;

  @Column({ type: 'varchar', length: 40 })
  chat_id: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Chat, chat => chat.messages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: Chat;

  @ManyToOne(() => User, user => user.messages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  sender: User;
}
