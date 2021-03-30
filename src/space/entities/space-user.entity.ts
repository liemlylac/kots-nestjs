import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user';
import { SpaceEntity } from './space.entity';

// Many to many table
@Entity('space_user')
export class SpaceUserEntity {
  @PrimaryColumn({ name: 'space_key' })
  spaceKey: string;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.spaceUsers,
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => SpaceEntity,
    space => space.spaceUsers,
  )
  @JoinColumn({ name: 'space_key' })
  space: SpaceEntity;

  // Extra Columns
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
