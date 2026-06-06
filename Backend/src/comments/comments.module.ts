import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Comment , Blog]),
    ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports : [CommentsService]
})
export class CommentsModule {}
