import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
@Unique(['blog', 'user'])
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Blog,
    (blog) => blog.likes,
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
}