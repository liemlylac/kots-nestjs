import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IssueEntity } from './issue.entity';
import { UserEntity } from '../../user';

@Entity('issue_attachment')
export class IssueAttachmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'issue_id',
    type: 'int',
    width: 11,
    nullable: false,
  })
  issueId: string;

  @Column({
    name: 'created_user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  createdUserId: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'size', type: 'int', width: 11, nullable: false })
  size: string;

  @CreateDateColumn()
  created: string;

  @ManyToOne(
    () => IssueEntity,
    issue => issue.attachments,
  )
  @JoinColumn({ name: 'issue_id' })
  issue: IssueEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.issueAttachments,
  )
  @JoinColumn({ name: 'user_id' })
  createdUser: UserEntity;
}
