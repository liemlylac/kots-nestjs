import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/entity/role.entity';

@Entity({ name: 'user' })
export class User {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  picture: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Exclude()
  @Column({ default: true })
  active: boolean;

  @ManyToOne(
    () => Role,
    role => role.users,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'role_id' })
  role?: Role;

  @ApiProperty()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
