import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApprovedUserGuard } from 'src/auth/guards/approved-user.guard';

@Controller('blog')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
  ) {}

  @UseGuards(
    JwtAuthGuard,
    ApprovedUserGuard
  )
  @Get('my-blogs')
  getMyBlogs(@Req() req: any) {
    return this.blogsService.getMyBlogs( req.user,);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get("approved")
  findApprovedAll(){
    return this.blogsService.findAprovedAll();
  }

  @Get("rejected")
  findRejectedAll(){
    return this.blogsService.findRejectedAll();
  }

  @Get("pending")
  findPendingAll(){
    return this.blogsService.findPendingAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne( Number(id), );
  }

  @UseGuards(
    JwtAuthGuard,
    ApprovedUserGuard
  )
  @Post()
  create(
    @Body() body: CreateBlogDto,
    @Req() req: any,
  ) {
    return this.blogsService.create(
      body,
      req.user,
    );
  }

  @UseGuards(
    JwtAuthGuard,
    ApprovedUserGuard
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateBlogDto,
    @Req() req: any,
  ) {
    return this.blogsService.update(
      Number(id),
      body,
      req.user,
    );
  }

  @UseGuards(
    JwtAuthGuard,
    ApprovedUserGuard
  )
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.blogsService.remove(
      Number(id),
      req.user,
    );
  }

  
}