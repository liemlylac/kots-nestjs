import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { Issue } from '../issue/issue.entity';

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  displayName: string;

  @Column({type: 'varchar', length: 255, unique: true})
  username: string;

  @Column({type: 'varchar', length: 255})
  password: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  email: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  phone: string;

  @Column({default: true})
  active: boolean;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @ManyToMany(type => Project)
  @JoinTable()
  projects: Project[];

  @OneToMany(type => Project, project => project.creator)
  projectsCreated: Project[];

  @OneToMany(type => Issue, issue => issue.creator)
  issuesCreated: Issue[];

  @ManyToMany(type => Issue)
  @JoinTable()
  issuesAssigned: Issue[];
}
