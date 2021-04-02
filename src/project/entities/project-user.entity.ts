import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../../user';
import { ProjectEntity } from './project.entity';

@Entity('project_user')
export class ProjectUserEntity {
  @PrimaryColumn({
    name: 'project_id',
    type: 'int',
    width: 11,
    nullable: false,
  })
  projectId: number;

  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  userId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.projectUsers,
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => ProjectEntity,
    project => project.projectUsers,
  )
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  // Extra Columns
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
