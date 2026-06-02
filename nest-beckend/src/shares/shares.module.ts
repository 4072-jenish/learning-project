import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share , Blog]),
  ],
  controllers: [SharesController],
  providers: [SharesService],
  exports : [SharesService]
})
export class SharesModule {}
