import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { FriendStatus } from '../enums/friendStatus';
import { AbstractModel } from './AbstractModel';

@Entity('friends')
export class Friend extends AbstractModel {
  @ManyToOne(() => User)
  @JoinColumn()
  requester: User;

  @ManyToOne(() => User)
  @JoinColumn()
  receiver: User;

  @Column({
    type: 'enum',
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  status: FriendStatus;
}
