import { Hono, type Env } from "hono";
import type { Variables } from "hono/types";
import { createBlogController, deleteBlogController, getAllBlogsController, getSingleBlogController, updateBlogController } from "../controllers/blog.controller.js";

const blogRouter = new Hono<{Bindings: Env; Variables: Variables}>();

blogRouter.get('/',getAllBlogsController);
blogRouter.get('/:id',getSingleBlogController);
blogRouter.post('/',createBlogController);
blogRouter.patch('/:id',updateBlogController);
blogRouter.delete('/:id',deleteBlogController);


export default blogRouter; 