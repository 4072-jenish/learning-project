import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../types/role.js";
import { Blog } from "./Blog.js";
import { OneToMany } from "typeorm";
import type { Relation } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: "varchar",
  })
  name!: string

  @Column({
    type: "varchar",
    unique: true
  })
  email!: string

  @Column({
    type: "varchar"
  })
  password!: string

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER
  })
  role!: Role

  @Column({
    type: "boolean",
    default: false
  })
  isDeleted!: boolean

  @OneToMany(
    () => Blog,
    (blog) => blog.author
  )
  blogs!: Relation<Blog[]>;
}