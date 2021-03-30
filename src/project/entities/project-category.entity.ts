import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('project_category')
export class ProjectCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id', type: 'int', width: 11 })
  projectId: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'keyword', type: 'varchar', length: 255 })
  keyword: string;

  @Column({ name: 'sort_order', type: 'int', width: 11 })
  sortOrder: number;

  @ManyToOne(
    () => ProjectEntity,
    project => project.categories,
  )
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
