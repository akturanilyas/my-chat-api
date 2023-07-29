import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { Chat } from './Chat';
import { User } from './User';

@Entity('users_chats')
export class UsersChat extends AbstractModel {
  @Column({
    type: 'string',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  chat_id: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  target_id: string;

  @Column('varchar', {
    length: 20,
    nullable: true,
  })
  target_type: string;

  @ManyToOne(() => Chat, chat => chat.usersChats, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: Chat;

  @ManyToOne(() => User, user => user.userChats, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, user => user.userChats, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'target_id', referencedColumnName: 'id' })
  target: User;
}
