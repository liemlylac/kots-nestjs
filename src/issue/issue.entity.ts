import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { IssueStatus } from './issue-status.enum';

@Entity({name: 'issue'})
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({name: 'status', type: 'varchar'})
  status: IssueStatus;

  @Column({name: 'start_date', type: 'datetime'})
  startDate: Date;

  @Column({name: 'due_date', type: 'datetime', nullable: true})
  dueDate: Date;

  @Column({name: 'finish_date', type: 'datetime', nullable: true})
  finishDate: Date;

  @Column({default: false})
  active: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
