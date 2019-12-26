import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueEntity } from '../issue/issue.entity';
import { UserEntity } from '../user/user.entity';

@Entity({name: 'project'})
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @OneToMany(() => IssueEntity, issue => issue.project)
  issues: IssueEntity[];

  @ManyToOne(() => UserEntity, user => user.projects)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

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
