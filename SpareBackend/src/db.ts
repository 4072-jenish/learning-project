import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import { Blog } from "./entity/Blog.js";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "jenish",
  password: "JENISH166",
  database: "nest_learning",

  synchronize: false,

  logging: false,

  entities: [User, Blog],

  migrations: ["src/migrations/**/*.ts"],
});

export default AppDataSource;