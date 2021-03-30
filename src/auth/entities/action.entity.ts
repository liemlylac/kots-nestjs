import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { ResourceEntity } from './resource.entity';

@Entity('auth_resource_action')
export class ActionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'resource_id', type: 'int' })
  resourceId: number;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(
    () => ResourceEntity,
    resource => resource.actions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'resource_id' })
  resource: ResourceEntity;

  @OneToMany(
    () => PermissionEntity,
    permission => permission.actions,
  )
  permissions: PermissionEntity;
}
