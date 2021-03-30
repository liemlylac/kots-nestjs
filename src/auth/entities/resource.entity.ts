import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActionEntity } from './action.entity';
import { PermissionEntity } from './permission.entity';

@Entity('auth_resource')
export class ResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => ActionEntity,
    action => action.resource,
  )
  actions: ActionEntity;

  @OneToMany(
    () => PermissionEntity,
    permission => permission.resources,
  )
  permissions: PermissionEntity[];
}
