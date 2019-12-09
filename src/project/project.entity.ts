import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Issue } from '../issue/issue.entity';
import { User } from '../user/user.entity';

@Entity({name: 'project'})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @OneToMany(type => Issue, issue => issue.project)
  issues: Issue[];

  @ManyToOne(type => User, user => user.projects)
  creator: User;

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
