import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from "typeorm"
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Share } from 'src/shares/entities/share.entity';
import { OneToMany } from 'typeorm';

export enum BlogStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  title!: string;

  @Column({
    type: 'text',
  })
  content!: string;

  @ManyToOne(
    () => User,
    (user) => user.blogs,
    {
      onDelete: 'CASCADE',
    },
  )
  author!: Relation<User>;

  @Column({
    type: 'text',
    nullable: true,
    default:
      'https://res.cloudinary.com/dp7ksf2mb/image/upload/v1778646031/hono-blogs/megkqx973uyqoh9k07tx.jpg',
  })
  imageUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.PENDING,
  })
  status!: BlogStatus;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Like, (like) => like.blog)
  likes!: Relation<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments!: Relation<Comment[]>;

  @OneToMany(() => Share, (share) => share.blog)
  shares!: Relation<Share[]>;
}