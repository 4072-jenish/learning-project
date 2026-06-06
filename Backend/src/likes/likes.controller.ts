import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':blogId/toggle')
  toggleLike(@Param('blogId') blogId: string, @Req() req: any) {
    return this.likesService.toggleLike(Number(blogId), req.user);
  }

  @Get('blog/:blogId')
  getBlogLikes(@Param('blogId') blogId: string) {
    return this.likesService.getBlogLikes(Number(blogId));
  }
}