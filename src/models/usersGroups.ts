import { Column, Entity } from 'typeorm';
import { AbstractModel } from './abstractModel';

@Entity('users_groups')
export class UsersGroups extends AbstractModel {
  @Column({
    type: 'int',
    nullable: false,
  })
  group_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  chat_id: number;
}
