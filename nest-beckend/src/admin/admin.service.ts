import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BlogsService } from '../blogs/blogs.service';
import { UsersService } from '../users/users.service';
import { Blog, BlogStatus } from 'src/blogs/entities/blog.entity';
import { User, UserStatus } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  // Analytics
async getAnalytics() {

  // USERS
  const users = await this.usersService.findAll(
    1,
    999999,
  );
  // BLOGS
  const blogs = await this.blogsService.findAll();
  const approvedBlogs = await this.blogsService.findAprovedAll();
  const rejectedBlogs = await this.blogsService.findRejectedAll();
  const pendingBlogs = await this.blogsService.findPendingAll();

  const dailyBlogs = await this.blogRepository
    .createQueryBuilder("blog")
    .select("DATE(blog.createdAt)", "date")
    .addSelect("COUNT(blog.id)", "blogs")
    .groupBy("DATE(blog.createdAt)")
    .orderBy("DATE(blog.createdAt)", "ASC")
    .getRawMany();
  return {
      totalUsers: users.pagination.total,
      totalBlogs: blogs.blogs.length,
      approvedBlogs: approvedBlogs.blogs.length,
      rejectedBlogs: rejectedBlogs.blogs.length,
      pendingBlogs: pendingBlogs.blogs.length,
      dailyBlogs
  };
}

  // Users
  async getAllUsers(
    page: number,
    limit: number,
    search: string,
    role?: string,
  ) {
    return this.usersService.findAll(
      page,
      limit,
      search,
      role,
    );
  }

  async deleteUser(id: number) {
    return this.usersService.remove(id);
  }

  async updateUserRole(
    id: number,
    role: string,
  ) {
    const user =
      await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }
    return this.usersService.update(id, { role } as any);
  }

  async approveUser(id: number) {
    const user =
      await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(
        "User not found"
      );
    }

    user.status = UserStatus.APPROVED;

    return this.userRepository.save(user);
  }

  async rejectUser(id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(
        "User not found"
      );
    }

    user.status = UserStatus.REJECTED;

    return this.userRepository.save(user);
  }

  // Blogs
  async getAllBlogs(
    page: number,
    limit: number,
    search: string,
  ) {
    return this.blogsService.findAdminBlogs();
  }

  async deleteBlog(id: number) {
    return this.blogsService.remove(id, {} as any);
  }

    async pendingBlogs() {
    const blog = await this.blogsService.findPendingAll();
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog
  }

  async approveBlog(id: number) {
    const blog = await this.blogsService.findOne(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return this.blogsService.updateStatus(id, BlogStatus.APPROVED);
  }
  
  async approvedBlogs() {
    const blog = await this.blogsService.findAprovedAll();
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog
  }

  async rejectBlog(id: number) {
    const blog = await this.blogsService.findOne(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return this.blogsService.updateStatus(id, BlogStatus.REJECTED);
  }

  async rejectedBlogs() {
    const blog = await this.blogsService.findRejectedAll();
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog
  }

  async searchBlog( title : string){
    const blog = await this.blogsService.searchBlog(title);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog
  }
}