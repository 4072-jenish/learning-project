import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { BlogsModule } from "./blogs/blogs.module";
import { UploadModule } from "./upload/upload.module";
import { AdminModule } from "./admin/admin.module";
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("DATABASE_URL"),

        autoLoadEntities: true,
        synchronize: true,

        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    UsersModule,
    AuthModule,
    BlogsModule,
    UploadModule,
    AdminModule,
    LikesModule,
    CommentsModule,
    SharesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}