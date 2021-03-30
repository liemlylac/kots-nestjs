import { IssueCommentEntity } from './issue-comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueAttachmentEntity } from './issue-attachment.entity';

@Entity('issue')
export class IssueEntity {
  parentIssue: string;

  @PrimaryColumn()
  key: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column()
  category: string;

  @Column()
  milestone: string;

  @Column()
  version: string;

  @Column()
  startDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  estimate: number;

  @Column()
  actual: number;

  comments: IssueCommentEntity[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(
    () => IssueAttachmentEntity,
    attachment => attachment.issue,
  )
  attachments: IssueAttachmentEntity[];
}
