import { Hono, type Env } from "hono";
import type { Variables } from "hono/types";
import  AppDataSource  from "../db.js";
import { deleteUser, editUser, getAllUsers, getUserById } from "../controllers/user.controller.js";

const userRouter = new Hono<{Bindings: Env; Variables: Variables}>();
const  userRepo = AppDataSource.getRepository("User");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", editUser);
userRouter.delete("/:id", deleteUser)

export default userRouter;