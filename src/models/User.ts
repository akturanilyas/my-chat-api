import { MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { UsersChats } from './UsersChats';
import { Friend } from './Friend';

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

  @OneToMany(() => UsersChats, usersChats => usersChats.user, {
    createForeignKeyConstraints: false,
  })
  userChats?: UsersChats;

  @OneToMany(() => Friend, user => user.requester)
  sentRequests: Friend[];

  @OneToMany(() => Friend, user => user.receiver)
  receivedRequests: Friend[];
}
