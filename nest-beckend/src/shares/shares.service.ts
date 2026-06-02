import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SharesService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,

    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async shareBlog(blogId: number, platform?: string) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const share = this.shareRepository.create({
      blog,
      platform,
    });

    await this.shareRepository.save(share);

    return {
      success: true,
      message: 'Share recorded successfully',
    };
  }

  async getBlogShares(blogId: number) {
    const count = await this.shareRepository.count({
      where: {
        blog: {
          id: blogId,
        },
      },
    });

    return {
      success: true,
      sharesCount: count,
    };
  }
}