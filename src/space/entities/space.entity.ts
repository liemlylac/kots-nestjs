import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { SpaceUserEntity } from './space-user.entity';
import { UserEntity } from '../../user';
import { ProjectEntity } from '../../project';

@Entity('space')
@Unique('UNIQUE_SPACE_DOMAIN', ['domain'])
export class SpaceEntity {
  @PrimaryColumn()
  key: string;

  @Column({
    name: 'owner_user_id',
    type: 'varchar',
    width: 36,
    nullable: false,
  })
  ownerUserId: string;

  @Column({ name: 'domain', type: 'varchar', length: 36, nullable: false })
  domain: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'logo', type: 'varchar', length: 255, nullable: true })
  logo?: string;

  @Column({ name: 'lang', type: 'varchar', length: 3, nullable: false })
  lang: string;

  @Column({ name: 'timezone', type: 'varchar', length: 255, nullable: false })
  timezone: string;

  @Column({ name: 'active', type: 'tinyint', width: 1, default: true })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @ManyToOne(
    () => UserEntity,
    user => user.ownerSpace,
  )
  @JoinColumn({ name: 'owner_user_id' })
  ownerUser: UserEntity;

  @OneToMany(
    () => SpaceUserEntity,
    spaceUser => spaceUser.space,
  )
  spaceUsers: SpaceUserEntity[];

  @OneToMany(
    () => ProjectEntity,
    project => project.space,
  )
  projects: ProjectEntity[];
}
