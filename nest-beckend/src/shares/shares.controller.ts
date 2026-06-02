import {
  Controller,
  Post,
  Get,
  Body,
  Param,
} from '@nestjs/common';

import { SharesService } from './shares.service';
import { CreateShareDto } from './dto/create-share.dto';

@Controller('shares')
export class SharesController {
  constructor(
    private readonly sharesService: SharesService,
  ) {}

  @Post('blog/:blogId')
  shareBlog(
    @Param('blogId') blogId: string,
    @Body() body: CreateShareDto,
  ) {
    return this.sharesService.shareBlog(
      Number(blogId),
      body.platform,
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