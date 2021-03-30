import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user';

@Entity('issue_comment')
export class IssueCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content?: string;

  changeLog: unknown;

  @Column({
    name: 'created_user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  createdUserId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.issueComment,
  )
  @JoinColumn({ name: 'user_id' })
  createdUser: UserEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  notification: UserEntity[];
}
