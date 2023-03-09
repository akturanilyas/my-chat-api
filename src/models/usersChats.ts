import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractModel } from './abstractModel';
import { Chat } from './chat';
import { User } from './user';

@Entity('users_chats')
export class UsersChats extends AbstractModel {
  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  chat_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  target_id: number;

  @Column('varchar', {
    length: 20,
    nullable: true,
  })
  target_type: string;

  @ManyToOne(() => Chat, chat => chat.usersChats)
  @JoinColumn({
    name: 'chat_id',
    referencedColumnName: 'id',
  })
  chat: Chat;

  @ManyToOne(() => User, user => user.userChats)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, user => user.userChats)
  @JoinColumn({ name: 'target_id', referencedColumnName: 'id' })
  target: User;
}
