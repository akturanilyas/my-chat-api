import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { Message } from './Message';
import { User } from './User';
import { UsersChats } from './UsersChats';

@Entity('chats')
export class Chat extends AbstractModel {
  @Column('varchar', { length: 20 })
  type: string;

  @OneToMany(() => UsersChats, usersChat => usersChat.chat)
  usersChats: UsersChats[];

  @OneToMany(() => UsersChats, usersChat => usersChat.user, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  users: User[];

  @OneToMany(() => Message, message => message.chat, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'chat_id',
  })
  messages: Message[];
}
