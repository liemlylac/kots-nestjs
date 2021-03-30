import { Entity, PrimaryColumn } from 'typeorm';

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
}
