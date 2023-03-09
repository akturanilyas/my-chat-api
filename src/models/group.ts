import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractModel } from './abstractModel';
import { Chat } from './chat';

@Entity('groups')
export class Group extends AbstractModel {
  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 190 })
  description: string;

  @Column({ type: 'int' })
  chat_id: number;

  @OneToOne(() => Chat)
  @JoinColumn({
    name: 'chatable_id',
    referencedColumnName: 'id',
  })
  chat: Chat;
}
