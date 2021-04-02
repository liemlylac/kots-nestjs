import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('project_status')
export class ProjectStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id', type: 'int', width: 32, nullable: false })
  projectId: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'color', type: 'varchar', length: 9, nullable: false })
  color: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(
    () => ProjectEntity,
    project => project.statuses,
  )
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;
}
