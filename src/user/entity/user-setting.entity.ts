import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'setting' })
export class UserSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  key: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  value: string;

  @Column({ name: 'user_id', type: 'varchar', length: 255, nullable: false })
  userId: string;

  constructor(partial?: Partial<UserSettingEntity>) {
    Object.assign(this, partial);
  }
}
