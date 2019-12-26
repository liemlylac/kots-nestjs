import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import { UserEntity } from '../user/user.entity';

@Entity({name: 'issue'})
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @ManyToOne(() => ProjectEntity, project => project.issues)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user.issuesCreated)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToMany(() => UserEntity, user => user.issuesAssigned)
  assignee: UserEntity[];

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
