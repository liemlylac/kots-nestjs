import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../../auth';
import { UserSettingEntity } from './user-setting.entity';
import { SpaceEntity } from '../../space';
import { SpaceUserEntity } from '../../space';
import { ProjectUserEntity } from '../../project';
import { IssueCommentEntity, IssueAttachmentEntity } from '../../issue/entities';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({
    name: 'active',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 1,
  })
  active: boolean;

  @Column({ name: 'birthday', type: 'datetime', nullable: true })
  birthday?: Date;

  @Column({ name: 'gender', type: 'tinyint', width: 1, nullable: true })
  gender?: number;

  @Column({ name: 'country', type: 'varchar', length: 10, nullable: false })
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(
    () => UserSettingEntity,
    userSetting => userSetting.user,
  )
  settings: UserSettingEntity[];

  @OneToMany(
    () => SpaceEntity,
    space => space.ownerUser,
  )
  ownerSpace: SpaceEntity[];

  @OneToMany(
    () => SpaceUserEntity,
    spaceUser => spaceUser.user,
  )
  spaceUsers: SpaceUserEntity[];

  @OneToMany(
    () => ProjectUserEntity,
    projectUser => projectUser.user,
  )
  projectUsers: ProjectUserEntity[];

  @OneToMany(
    () => IssueCommentEntity,
    comment => comment.createdUser,
  )
  issueComment: IssueCommentEntity[];

  @OneToMany(
    () => IssueAttachmentEntity,
    attachment => attachment.createdUser,
  )
  issueAttachments: IssueAttachmentEntity[];
}
