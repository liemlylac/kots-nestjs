import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { ActionEntity } from './action.entity';
import { ResourceEntity } from './resource.entity';
import { RoleEntity } from './role.entity';

@Entity('auth_role_permission')
@Unique(['roleId', 'resourceId', 'actionId'])
export class PermissionEntity extends BaseEntity {
  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @PrimaryColumn({ name: 'resource_id', type: 'int' })
  resourceId: number;

  @PrimaryColumn({ name: 'action_id', type: 'int' })
  actionId: number;

  @Column({
    name: 'is_allowed',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  isAllowed: boolean;

  @ManyToOne(
    () => RoleEntity,
    role => role.permission,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(
    () => ResourceEntity,
    resource => resource.permissions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'resource_id' })
  resources: ResourceEntity[];

  @ManyToOne(
    () => ActionEntity,
    action => action.permissions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'action_id' })
  actions: ActionEntity[];
}
