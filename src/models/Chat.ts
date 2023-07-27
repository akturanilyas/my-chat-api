import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { Message } from './Message';
import { User } from './User';
import { TargetType } from '../enums/targetType';

@Entity('chats')
export class Chat extends AbstractModel {
  @Column('varchar', { length: 20 })
  type: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  target_id: string;

  @Column('varchar', {
    length: 20,
    nullable: true,
    default: TargetType.USER,
  })
  target_type: string;

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
