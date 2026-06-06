import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import multer from 'multer';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),

      limits: {
        fileSize: 5 * 1024 * 1024,
      },

      fileFilter: (
        req,
        file,
        cb,
      ) => {
        if (
          file.mimetype.startsWith(
            'image/',
          )
        ) {
          cb(null, true);
        } else {
          cb(
            new Error(
              'Only images allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const result =
      await this.uploadService.uploadImage(
        file,
      );

    return {
      success: true,
      message:
        'Image uploaded successfully',

      imageUrl: result.secure_url,
    };
  }

  @Post('update')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  async updateImage(
    @UploadedFile()
    file: Express.Multer.File,

    @Body('oldImageUrl')
    oldImageUrl: string,
  ) {
    const result =
      await this.uploadService.updateImage(
        file,
        oldImageUrl,
      );

    return {
      success: true,
      message:
        'Image updated successfully',

      imageUrl: result.secure_url,
    };
  }
}