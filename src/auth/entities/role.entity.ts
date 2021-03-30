import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user';
import { PermissionEntity } from './permission.entity';

@Entity('auth_role')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => UserEntity,
    user => user.role,
  )
  users: UserEntity[];

  @OneToMany(
    () => PermissionEntity,
    permission => permission.role,
  )
  permission: PermissionEntity[];
}
