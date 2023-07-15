import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { FriendStatus } from '../enums/friendStatus';
import { AbstractModel } from './AbstractModel';

@Entity('friends')
export class Friend extends AbstractModel {
  @Column({
    type: 'string',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'string',
    nullable: false,
  })
  receiver_id: string;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  requester: User;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
  receiver: User;

  @Column({
    type: 'varchar',
    default: FriendStatus.PENDING,
  })
  status: FriendStatus;
}
