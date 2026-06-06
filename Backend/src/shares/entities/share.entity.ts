import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Share {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Blog,
    (blog) => blog.shares,
    {
      onDelete: 'CASCADE',
    },
  )
  blog!: Relation<Blog>;

  @ManyToOne(
    () => User,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  user?: Relation<User>;

  @Column({
    nullable: true,
  })
  platform?: string;

  @CreateDateColumn()
  createdAt!: Date;
}