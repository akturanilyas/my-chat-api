import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({})
  created_at: Date;

  @UpdateDateColumn({})
  updated_at: Date;

  @DeleteDateColumn({})
  deleted_at: Date;
}
