import AppDataSource from "../db.js";

import { Blog } from "../entity/Blog.js";
import { User } from "../entity/User.js";

const blogRepo =
  AppDataSource.getRepository(Blog);

export const fetchBlogs = async () => {
  try {
    const blogs = await blogRepo.find({
      relations: ["author"],
    });

    return blogs;
  } catch (error) {
    throw new Error(
      "Error fetching blogs"
    );
  }
};

export const findBlogById = async (
  id: number
) => {
  try {
    const blog = await blogRepo.findOne({
      where: { id },
      relations: ["author"],
    });

    return blog;
  } catch (error) {
    throw new Error(
      "Error finding blog"
    );
  }
};

export const findBlogByTitle = async (
  title: string
) => {
  try {
    const blog = await blogRepo.findOne({
      where: { title },
      relations: ["author"],
    });

    return blog;
  } catch (error) {
    throw new Error(
      "Error finding blog"
    );
  }
};

export const createBlog = async (
  title: string,
  content: string,
  imageUrl: string,
  author: User
) => {
  try {
    const newBlog = blogRepo.create({
      title,
      content,
      imageUrl,
      author,
    });

    const savedBlog =
      await blogRepo.save(newBlog);

    return savedBlog;
  } catch (error) {
    throw new Error(
      "Error creating blog"
    );
  }
};

export const updateBlog = async (
  id: number,
  title: string,
  content: string,
  imageUrl: string
) => {
  try {
    const blog = await blogRepo.findOne({
      where: { id },
      relations: ["author"],
    });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    blog.title = title;
    blog.content = content;
    blog.imageUrl= imageUrl;

    const updatedBlog =
      await blogRepo.save(blog);

    return updatedBlog;
  } catch (error) {
    throw new Error(
      "Error updating blog"
    );
  }
};

export const deleteBlog = async (
  id: number
) => {
  try {
    const blog = await blogRepo.findOne({
      where: { id },
    });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    await blogRepo.remove(blog);

    return blog;
  } catch (error) {
    throw new Error(
      "Error deleting blog"
    );
  }
};

export const fetchBlogsByUser =
  async (userId: number) => {
    try {
      const blogs =
        await blogRepo.find({
          where: {
            author: {
              id: userId,
            },
          },

          relations: ["author"],
        });

      return blogs;
    } catch (error) {
      throw new Error(
        "Error fetching user blogs"
      );
    }
  };

export default {
  fetchBlogs,
  findBlogById,
  findBlogByTitle,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchBlogsByUser,
};