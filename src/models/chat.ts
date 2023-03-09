import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractModel } from './abstractModel';
import { Group } from './group';
import { Message } from './message';
import { User } from './user';
import { UsersChats } from './usersChats';

@Entity('chats')
export class Chat extends AbstractModel {
  @Column('varchar', { length: 20 })
  type: string;

  @OneToMany(() => UsersChats, usersChat => usersChat.chat)
  usersChats: UsersChats[];

  @OneToMany(() => UsersChats, usersChat => usersChat.user, { eager: true })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  users: User[];

  @OneToMany(() => Message, message => message.chat, { eager: true })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'chat_id',
  })
  messages: Message[];
}
