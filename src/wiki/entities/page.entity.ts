import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wiki_page')
export class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parent_id', type: 'int', width: 11, nullable: true })
  parentId: number;

  @Column({ name: 'version', type: 'int', width: 11, nullable: false })
  version: number;

  @Column({ name: 'slug', type: 'varchar', length: 255, nullable: false })
  slug: string;

  @Column({ name: 'path', type: 'varchar', length: 255, nullable: false })
  path: string;

  @Column({ name: 'title', type: 'varchar', width: 255, nullable: false })
  title: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({ name: 'sort_order', type: 'int', width: 11, default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @OneToMany(
    () => PageEntity,
    page => page.parent,
  )
  children: PageEntity[];

  @ManyToOne(
    () => PageEntity,
    page => page.children,
  )
  @JoinColumn({ name: 'parent_id' })
  parent: PageEntity;
}
