import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
