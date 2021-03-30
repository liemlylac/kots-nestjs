import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('project_issue_type')
export class ProjectIssueTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id', type: 'int', width: 11, nullable: false })
  projectId: number;

  @Column({ name: 'color', type: 'varchar', length: 9, nullable: false })
  color: string;

  @Column({ name: 'sortOrder', type: 'int', width: 11, default: 0 })
  sortOrder: number;

  @Column({ name: 'keyword', type: 'varchar', length: 255, nullable: false })
  keyword: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({
    name: 'temp_summary',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  tempSummary?: string;

  @Column({ name: 'temp_description', type: 'text', nullable: true })
  tempDescription?: string;

  @ManyToOne(
    () => ProjectEntity,
    project => project.issueTypes,
  )
  project: ProjectEntity;
}
