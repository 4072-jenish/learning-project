import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('blog/:blogId')
  createComment(
    @Param('blogId') blogId: string,
    @Req() req: any,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.createComment(Number(blogId), req.user, body);
  }

  @Get('blog/:blogId')
  getBlogComments(@Param('blogId') blogId: string) {
    return this.commentsService.getBlogComments(Number(blogId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Req() req: any,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(Number(commentId), req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string, @Req() req: any) {
    return this.commentsService.deleteComment(Number(commentId), req.user);
  }
}