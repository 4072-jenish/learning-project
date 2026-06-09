import { Blog } from 'src/blogs/entities/blog.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {Relation} from "typeorm";
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Share } from 'src/shares/entities/share.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  name!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted!: boolean;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status!: UserStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => Blog,
    (blog: Relation<Blog>) => blog.author,
  )
  blogs!: Relation<Blog[]>;
  
  @Column({ nullable: true })
  emailOtp!: string;

  @Column({ nullable: true })
  emailOtpExpiresAt!: Date;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @OneToMany(() => Like, (like) => like.user)
  likes!: Relation<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Relation<Comment[]>;

  @OneToMany(() => Share, (share) => share.user)
  shares!: Relation<Share[]>;
}