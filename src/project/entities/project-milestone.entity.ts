import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('project_milestone')
export class ProjectMilestoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id', type: 'int', width: 11, nullable: false })
  projectId: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'keyword', type: 'varchar', length: 255 })
  keyword: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate?: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @ManyToOne(
    () => ProjectEntity,
    project => project.milestones,
  )
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
