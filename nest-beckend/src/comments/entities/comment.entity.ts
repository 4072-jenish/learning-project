import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  text!: string;

  @ManyToOne(
    () => Blog,
    (blog) => blog.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  blog!: Relation<Blog>;

  @ManyToOne(
    () => User,
    {
      onDelete: 'CASCADE',
    },
  )
  user!: Relation<User>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}