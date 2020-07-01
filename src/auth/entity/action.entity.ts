import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Resource } from './resource.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'auth_action' })
@Unique('UNIQUE_RESOURCE_ACTION', ['resourceId', 'code'])
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'resource_id', type: 'int' })
  resourceId: number;

  @Column({ type: 'varchar', length: 128 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(
    () => Resource,
    resource => resource.actions,
  )
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @OneToMany(
    () => Permission,
    permission => permission.action,
  )
  permission: Permission[];
}
