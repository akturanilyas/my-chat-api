import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractPivot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
