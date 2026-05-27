  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { UsersModule } from './users/users.module';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

  @Module({
    imports: [
      UsersModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'jenish',
        password: 'JENISH166',
        database: 'nest_learning',
        autoLoadEntities: true,
        synchronize: true,
      }),

      AuthModule,
      BlogsModule,
      UploadModule,
      AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}