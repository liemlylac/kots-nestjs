import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  Unique,
} from 'typeorm';
import { Role } from './role.entity';
import { Resource } from './resource.entity';
import { Action } from './action.entity';

@Entity({ name: 'auth_permission' })
@Unique('UNIQUE_PERMISSION', ['role', 'resource', 'action'])
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Role,
    role => role.permission,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    () => Resource,
    resource => resource.permission,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'resource_id' })
  resource: Role;

  @ManyToOne(
    () => Action,
    action => action.permission,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'action_id' })
  action: Role;

  @Column({ name: 'is_allow', type: 'tinyint', width: 1, select: false })
  isAllow: boolean;
}
