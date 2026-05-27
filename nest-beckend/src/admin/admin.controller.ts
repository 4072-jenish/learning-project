import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Dashboard
  @Get('analytics')
  getAnalytics() {
    return this.adminService.getAnalytics();
  }

  // Users
  @Get('users')
  getAllUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('role') role?: string,
  ) {
    return this.adminService.getAllUsers(
      Number(page),
      Number(limit),
      search,
      role,
    );
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(Number(id));
  }

  @Patch('users/:id/role')
  updateUserRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ) {
    return this.adminService.updateUserRole(
      Number(id),
      role,
    );
  }

  // Blogs
  @Get('blogs')
  getAllBlogs(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
  ) {
    return this.adminService.getAllBlogs(
      Number(page),
      Number(limit),
      search,
    );
  }

  @Delete('blogs/:id')
  deleteBlog(@Param('id') id: string) {
    return this.adminService.deleteBlog(Number(id));
  }

  @Get('pending/blogs')
  pendingBlogs() {
    return this.adminService.pendingBlogs();
  }

  @Patch('blogs/:id/approve')
  approveBlog(@Param('id') id: string) {
    return this.adminService.approveBlog(Number(id));
  }

  @Get('approved/blogs')
  approvedBlogs() {
    return this.adminService.approvedBlogs();
  }

  @Patch('blogs/:id/reject')
  rejectBlog(@Param('id') id: string) {
    return this.adminService.rejectBlog(Number(id));
  }

  @Get("blogs/search")
  searchBlog(@Query("title") title: string) {
    return this.adminService.searchBlog(title);
  }

  @Get('rejected/blogs')
  rejectedBlogs(@Param('id') id: string) {
    return this.adminService.rejectedBlogs();
  }

  @Patch("users/:id/approve")
  approveUser(@Param("id") id: string) {
    return this.adminService.approveUser(Number(id));
  }

  @Patch("users/:id/reject")
  rejectUser(@Param("id") id: string) {
    return this.adminService.rejectUser(Number(id));
  }

}