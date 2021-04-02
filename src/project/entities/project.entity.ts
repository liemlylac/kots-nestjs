import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStatusEntity } from './project-status.entity';
import { SpaceEntity } from '../../space';
import { ProjectIssueTypeEntity } from './project-issue-type.entity';
import { ProjectCategoryEntity } from './project-category.entity';
import { ProjectMilestoneEntity } from './project-milestone.entity';
import { ProjectWebhookEntity } from './project-webhook.entity';
import { ProjectUserEntity } from './project-user.entity';

@Entity('project')
@Index('IDX_PROJECT_KEY_SPACE_KEY', ['spaceKey', 'key'])
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'space_key', type: 'varchar', length: 10, nullable: false })
  spaceKey: string;

  @Column({ name: 'key', type: 'varchar', length: 10, nullable: false })
  key: string;

  @Column()
  name: string;

  @Column({ name: 'chart_enable', type: 'tinyint', width: 1, default: false })
  chartEnable: boolean;

  @Column({ name: 'subtask_enable', type: 'tinyint', width: 1, default: false })
  subtaskEnable: boolean;

  @Column({
    name: 'text_formatting_rule',
    type: 'varchar',
    width: 255,
    default: 'markdown',
  })
  textFormattingRule: string;

  @Column('varchar', { name: 'active', default: true })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @ManyToOne(
    () => SpaceEntity,
    space => space.projects,
  )
  @JoinColumn({ name: 'space_id' })
  space?: SpaceEntity;

  @OneToMany(
    () => ProjectUserEntity,
    projectUser => projectUser.project,
  )
  projectUsers: ProjectUserEntity[];

  @OneToMany(
    () => ProjectStatusEntity,
    projectStatus => projectStatus.project,
  )
  statuses?: ProjectStatusEntity[];

  @OneToMany(
    () => ProjectIssueTypeEntity,
    type => type.project,
  )
  issueTypes?: ProjectIssueTypeEntity[];

  @OneToMany(
    () => ProjectCategoryEntity,
    category => category.project,
  )
  categories?: ProjectCategoryEntity[];

  @OneToMany(
    () => ProjectMilestoneEntity,
    milestone => milestone.project,
  )
  milestones?: ProjectMilestoneEntity[];

  @OneToMany(
    () => ProjectWebhookEntity,
    webhook => webhook.project,
  )
  webhooks?: ProjectWebhookEntity[];
}
