import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

@Entity({name: 'issue'})
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @ManyToOne(type => Project, project => project.issues)
  project: Project;

  @ManyToOne(type => User, user => user.issuesCreated)
  creator: User;

  @ManyToMany(type => User, user => user.issuesAssigned)
  assignee: User[];

  @Column({type: 'datetime'})
  startDate: Date;

  @Column({type: 'datetime', nullable: true})
  dueDate: Date;

  @Column({type: 'datetime', nullable: true})
  finishDate: Date;

  @Column({default: false})
  active: boolean;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

}
