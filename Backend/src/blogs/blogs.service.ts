import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Blog, BlogStatus } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) { }

  async create( body: CreateBlogDto, user: any ) {
    const existingBlog = await this.blogRepository.findOne({
        where: { title: body.title },
      });
    if (existingBlog) {
      throw new BadRequestException( 'Blog already exists', );
    }
    const blog = this.blogRepository.create({
      ...body,
      author: user,
    });
    await this.blogRepository.save(blog);
    return {
      success: true,
      message: 'Blog created successfully',
      blog,
    };
  }

  async findAll() {
    const blogs = await this.blogRepository.find({
        where: { status: BlogStatus.APPROVED },
        relations: ['author'],
        order: { createdAt: 'DESC' },
      });
    return {
      success: true,
      blogs,
    };
  }

  async findAdminBlogs() {
    const blogs = await this.blogRepository.find({
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      success: true,
      blogs,
    };
  }

  async findRejectedAll() {
    const blogs = await this.blogRepository.find({
        where: { status: BlogStatus.REJECTED },
        relations: ['author'],
        order: {
          createdAt: 'DESC',
        },
      });

    return {
      success: true,
      blogs,
    };
  }

  async findAprovedAll() {
    const blogs = await this.blogRepository.find({
      where: { status: BlogStatus.APPROVED },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });
    
    return {
      success: true,
      blogs,
    };
  }

  async findPendingAll() {
    const blogs = await this.blogRepository.find({
      where: { status: BlogStatus.PENDING },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      success: true,
      blogs,
    };
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
        where: { id },
        relations: {
          author: true,
          comments: true,
          likes: true,
          shares: true,
        },
      });
    if (!blog) {
      throw new NotFoundException('Blog not found',);
    }
    return {
      ...blog,
      commentsCount: blog.comments.length,
      likesCount: blog.likes.length,
      sharesCount: blog.shares.length,
    };
  }

  async update(id: number, body: CreateBlogDto, user: any) {
    const blog = await this.blogRepository.findOne({
        where: { id },
        relations: ['author'],
      });

    if (!blog) {
      throw new NotFoundException( 'Blog not found', );
    }
    const isOwner = blog.author.id === user.id;
    const isAdmin = user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException( 'Forbidden',);
    }

    blog.title = body.title;
    blog.content = body.content;
    if (body.imageUrl) {
      blog.imageUrl = body.imageUrl;
    }
    await this.blogRepository.save(blog);
    return {
      success: true,
      message: 'Blog updated successfully',
      blog,
    };
  }

  async remove(id: number, user: any) {
    const blog = await this.blogRepository.findOne({
        where: { id },
        relations: ['author'],
    });
    if (!blog) {
      throw new NotFoundException( 'Blog not found', );
    }
    const isOwner = blog.author.id === user.id;
    const isAdmin = user.role === 'ADMIN';
    if (!isOwner && !isAdmin) {
      throw new ForbiddenException( 'Forbidden', );
    }
    await this.blogRepository.remove(blog);
    return {
      success: true,
      message: 'Blog deleted successfully',
    };
  }

  async getMyBlogs(user: any) {
    const blogs = await this.blogRepository.find({
      where: {
        author: { id: user.id }
      },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      }
    })
    return {
      success: true,
      blogs
    }
  }

  async updateStatus(id: number, status: BlogStatus) {
    const blog = await this.blogRepository.findOne({ 
      where: { id } 
    });
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    blog.status = status;
    return this.blogRepository.save(blog);
  }

  async searchBlog(title: string) {
    const blogs = await this.blogRepository.find({
      where: { title: ILike(`%${title}%`) },
    });
    if (blogs.length === 0) {
      throw new NotFoundException("Blogs not found");
    }
    return blogs;
  }
}
