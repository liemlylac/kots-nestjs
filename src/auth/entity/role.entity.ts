import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'auth_role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => User,
    user => user.role,
    {
      cascade: true,
    },
  )
  users: User[];

  @OneToMany(
    () => Permission,
    permission => permission.role,
    {
      onDelete: 'CASCADE',
    },
  )
  permission: Permission[];

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;
}
