import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Share } from 'src/shares/entities/share.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Like, Comment, Blog, Share]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}