// controllers/blog.controller.ts

import type { User } from "../entity/User.js";
import {
   createBlog,
   fetchBlogs,
   findBlogById,
   findBlogByTitle,
   updateBlog,
   deleteBlog as deleteBlogService,
} from "../services/blog.services.js";

import { findUserById } from "../services/user.services.js";

import { canManageBlog } from "../utils/authorization.js";

export const createBlogController =
   async (c: any) => {
      try {
         const { title, content, imageUrl } = await c.req.json();
         if (!title.trim() || !content.trim()) {
            return c.json(
               {
                  message: "Title and content are required",
               },
               400
            );
         }

         const payload = c.get(
            "jwtPayload"
         ) as {
            id: number;
            email: string; 
            role: string;
         };

         const existingBlog =
            await findBlogByTitle(title);

         if (existingBlog) {
            return c.json(
               {
                  message:
                     "Blog already exists",
               },
               400
            );
         }

         const author = await findUserById(
            payload.id
         );

         if (!author) {
            return c.json(
               {
                  message:
                     "Author not found",
               },
               404
            );
         }

         const blog = await createBlog(
            title,
            content,
            imageUrl,
            author as User
         );

         return c.json(
            {
               message:
                  "Blog created successfully",
               blog,
            },
            201
         );
      } catch (error) {
         return c.json(
            {
               message:
                  "Something went wrong",
            },
            500
         );
      }
   };

export const getAllBlogsController =
   async (c: any) => {
      try {
         const allBlogs =
            await fetchBlogs();
         console.log();
         
         return c.json(
            {
               message:
                  "Blogs fetched successfully",
               blogs: allBlogs,
            },
            200
         );
      } catch (error) {
         console.log(error);
         return c.json(
            {
               message:
                  "Something went wrong",
            },
            500
         );
      }
   };

export const getSingleBlogController =
   async (c: any) => {
      try {
         const blogId = Number(
            c.req.param("id")
         );

         const blog =
            await findBlogById(blogId);

         if (!blog) {
            return c.json(
               {
                  message:
                     "Blog not found",
               },
               404
            );
         }

         return c.json(
            {
               message:
                  "Blog fetched successfully",
               blog,
            },
            200
         );
      } catch (error) {
         return c.json(
            {
               message:
                  "Something went wrong",
            },
            500
         );
      }
   };

export const updateBlogController =
   async (c: any) => {
      try {
         const blogId = Number(
            c.req.param("id")
         );
         const { title, content, imageUrl } =
            await c.req.json();

         const blog =
            await findBlogById(blogId);

         if (!blog) {
            return c.json(
               {
                  message:
                     "Blog not found",
               },
               404
            );
         }

         const payload = c.get(
            "jwtPayload"
         ) as {
            id: number;
            role: string;
         };

         const allowed =
            canManageBlog(
               blog.author.id,
               payload.id,
               payload.role
            );

         if (!allowed) {
            return c.json(
               {
                  message:
                     "aap ye nahi ker sakte !",
               },
               403
            );
         }

         const updatedBlog =
            await updateBlog(
               blogId,
               title,
               content,
               imageUrl
            );

         return c.json(
            {
               message:
                  "Blog updated successfully",
               blog: updatedBlog,
            },
            200
         );
      } catch (error) {
         return c.json(
            {
               message:
                  "Something went wrong",
            },
            500
         );
      }
   };

export const deleteBlogController =
   async (c: any) => {
      try {
         const blogId = Number(
            c.req.param("id")
         );

         const blog =
            await findBlogById(blogId);

         if (!blog) {
            return c.json(
               {
                  message:
                     "Blog not found",
               },
               404
            );
         }

         const payload = c.get(
            "jwtPayload"
         ) as {
            id: number;
            role: string;
         };

         const allowed =
            canManageBlog(
               blog.author.id,
               payload.id,
               payload.role
            );

         if (!allowed) {
            return c.json(
               {
                  message:
                     "Forbidden",
               },
               403
            );
         }

         await deleteBlogService(blogId);

         return c.json(
            {
               message:
                  "Blog deleted successfully",
            },
            200
         );
      } catch (error) {
         return c.json(
            {
               message:
                  "Something went wrong",
            },
            500
         );
      }
   };