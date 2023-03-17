import { MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractModel } from './abstractModel';
import { UsersChats } from './usersChats';

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
    select: false,
  })
  password: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  age?: number;

  @OneToMany(() => UsersChats, usersChats => usersChats.user)
  userChats?: UsersChats;
}
