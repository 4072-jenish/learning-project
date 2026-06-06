import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { BlogsModule } from 'src/blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Blog]),
    UsersModule,
    BlogsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
