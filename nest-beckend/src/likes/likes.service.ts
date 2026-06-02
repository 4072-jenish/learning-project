import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './entities/like.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,

    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async toggleLike(blogId: number, user: User) {  
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const existingLike = await this.likeRepository.findOne({
      where: {
        blog: { id: blogId },
        user: { id: user.id },
      },
    });

    if (existingLike) {
      await this.likeRepository.remove(existingLike);

      const likesCount = await this.likeRepository.count({
        where: { blog: { id: blogId } },
      });

      return {
        success: true,
        liked: false,
        likesCount,
        message: 'Like removed',
      };
    }

    const like = this.likeRepository.create({
      blog,
      user,
    });

    await this.likeRepository.save(like);

    const likesCount = await this.likeRepository.count({
      where: { blog: { id: blogId } },
    });

    return {
      success: true,
      liked: true,
      likesCount,
      message: 'Blog liked',
    };
  }

  async getBlogLikes(blogId: number) {
    const count = await this.likeRepository.count({
      where: {
        blog: { id: blogId },
      },
    });

    return {
      success: true,
      likesCount: count,
    };
  }
}