import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_setting')
export class UserSettingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'key', type: 'varchar', length: 255 })
  key: string;

  @Column({ name: 'value', type: 'text' })
  value: string;

  @ManyToOne(
    () => UserEntity,
    user => user.settings,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  constructor(setting?: Partial<UserSettingEntity>) {
    super();
    Object.assign(this, setting);
  }
}
