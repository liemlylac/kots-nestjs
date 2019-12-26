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
import { Exclude } from 'class-transformer';
import { ProjectEntity } from '../project/project.entity';
import { IssueEntity } from '../issue/issue.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'user'})
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({name: 'display_name', type: 'varchar', length: 255})
  displayName: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 255, unique: true})
  username: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 255})
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 255, nullable: true})
  email: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 255, nullable: true})
  phone: string;

  @ApiProperty()
  @Column({default: true})
  active: boolean;

  @ApiProperty()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ApiProperty()
  @ManyToMany(() => ProjectEntity)
  @JoinTable()
  projects: ProjectEntity[];

  @ApiProperty()
  @OneToMany(() => ProjectEntity, project => project.creator)
  projectsCreated: ProjectEntity[];

  @ApiProperty()
  @OneToMany(() => IssueEntity, issue => issue.creator)
  issuesCreated: IssueEntity[];

  @ApiProperty()
  @ManyToMany(() => IssueEntity)
  @JoinTable()
  issuesAssigned: IssueEntity[];

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
