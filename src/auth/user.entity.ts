import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserActive } from './user-active.enum';

@Entity({name: 'user'})
@Unique(['username'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({name: 'username', type: 'varchar', length: 50})
  username: string;

  @ApiProperty()
  @Column({name: 'password', type: 'varchar', length: 128})
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({name: 'first_name', type: 'varchar', length: 255, nullable: true})
  firstName: string;

  @ApiProperty()
  @Column({name: 'last_name', type: 'varchar', length: 255, nullable: true})
  lastName: string;

  @ApiProperty()
  @Column({name: 'email', type: 'varchar', length: 255, nullable: true})
  email: string;

  @ApiProperty()
  @Column({name: 'phone', type: 'varchar', length: 25, nullable: true})
  phone: string;

  @ApiProperty()
  @Column({name: 'is_active', default: true})
  isActive: UserActive;

  @ApiProperty()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
