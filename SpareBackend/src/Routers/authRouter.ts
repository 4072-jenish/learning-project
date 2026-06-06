import { Hono } from "hono";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = new Hono();

authRouter.post('/login', loginUser);
authRouter.use('/register/*', authMiddleware);
authRouter.post('/register', roleMiddleware("admin") , registerUser);

export default authRouter;