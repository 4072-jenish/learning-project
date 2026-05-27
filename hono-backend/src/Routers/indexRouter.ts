import { Hono, type Env } from "hono";
import type { Variables } from "hono/types";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import blogRouter from "./blogRouter.js";
import uploadRouter from "./uploadRouter.js";

const indexRouter = new Hono<{Bindings: Env; Variables: Variables}>();

indexRouter.route('/auth', authRouter)
indexRouter.use('/users/*', authMiddleware , roleMiddleware("admin"));
indexRouter.route('/users', userRouter);
indexRouter.use('/upload/*', authMiddleware);
indexRouter.route('/upload', uploadRouter);
indexRouter.use('/blog/*', authMiddleware );
indexRouter.route('/blog', blogRouter);


export default indexRouter;