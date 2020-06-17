import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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
  @Column({ name: 'display_name', type: 'varchar', length: 255 })
  displayName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Exclude()
  @Column({ default: true })
  active: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
