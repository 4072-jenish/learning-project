import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async createComment(blogId: number, user: User, body: CreateCommentDto) {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const comment = this.commentRepository.create({
      text: body.text,
      blog,
      user,
    });

    await this.commentRepository.save(comment);

    return {
      success: true,
      message: 'Comment added successfully',
      comment,
    };
  }

  async getBlogComments(blogId: number) {
    const comments = await this.commentRepository.find({
      where: {
        blog: { id: blogId },
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      success: true,
      comments,
    };
  }

  async updateComment(commentId: number, user: User, body: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException('You can update only your own comment');
    }

    comment.text = body.text;

    await this.commentRepository.save(comment);

    return {
      success: true,
      message: 'Comment updated successfully',
      comment,
    };
  }

  async deleteComment(commentId: number, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException('You can delete only your own comment');
    }

    await this.commentRepository.remove(comment);

    return {
      success: true,
      message: 'Comment deleted successfully',
    };
  }
}