import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';

import { SharesService } from './shares.service';
import { CreateShareDto } from './dto/create-share.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('shares')
export class SharesController {
  constructor(
    private readonly sharesService: SharesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('blog/:blogId')
  shareBlog(
    @Param('blogId') blogId: string,
    @Body() body: CreateShareDto,
    @Req() req: any,
  ) {
    return this.sharesService.shareBlog(
      Number(blogId),
      body.platform,
      req.user,
    );
  }

  @Get('blog/:blogId')
  getBlogShares(
    @Param('blogId') blogId: string,
  ) {
    return this.sharesService.getBlogShares(
      Number(blogId),
    );
  }
}