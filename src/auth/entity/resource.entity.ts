import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Action } from './action.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'auth_resource' })
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => Permission,
    permission => permission.resource,
  )
  permission: Permission[];

  @OneToMany(
    () => Action,
    action => action.resource,
    {
      cascade: true,
    },
  )
  actions: Action[];
}
