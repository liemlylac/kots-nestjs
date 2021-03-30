import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth_session')
@Index('session_idx', ['userId', 'deviceId'])
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'device_id' })
  deviceId: string;

  @Column({ name: 'user_id', type: 'varchar', length: '36', nullable: true })
  userId: string;

  @Column({ name: 'signature', type: 'varchar', nullable: true })
  signature: string;

  @Column({
    name: 'device_type',
    type: 'varchar',
    length: '50',
    nullable: true,
  })
  deviceType: string;

  @Column({ name: 'device_os', type: 'varchar', length: '50', nullable: true })
  deviceOs: string;

  @Column({ name: 'device_info', type: 'json', nullable: true })
  deviceInfo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
