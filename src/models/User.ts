import { MinLength } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractModel } from './AbstractModel';
import { UsersChats } from './UsersChats';

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

  @ManyToMany(() => User, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'friend_id', referencedColumnName: 'id' },
  })
  // eslint-disable-next-line no-use-before-define
  friends: User[];
}
