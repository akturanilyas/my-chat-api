import { MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { Friend } from './Friend';
import { Chat } from './Chat';
import { Message } from './Message';

@Entity('users')
export class User extends AbstractModel {
  @Column('varchar', { length: 20 })
  first_name: string;

  @Column('varchar', { length: 20 })
  last_name: string;

  @Column('varchar', { length: 20 })
  username: string;

  @Column('varchar', {
    length: 100,
    nullable: true,
    unique: true,
  })
  email: string;

  @MinLength(5)
  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  age?: number;

  @OneToMany(() => Chat, chat => chat.usersChats, {
    createForeignKeyConstraints: false,
  })
  chats?: Array<Chat>;

  @OneToMany(() => Friend, user => user.requester, {
    createForeignKeyConstraints: false,
  })
  sentRequests: Friend[];

  @OneToMany(() => Friend, user => user.receiver, {
    createForeignKeyConstraints: false,
  })
  receivedRequests: Friend[];

  @OneToMany(() => Friend, user => user.receiver, {
    createForeignKeyConstraints: false,
  })
  userChats: Friend[];

  @OneToMany(() => Message, message => message.sender)
  messages: Array<Message>;

  getFullName = () => `${this.first_name} ${this.last_name}`;
}
