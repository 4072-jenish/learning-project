import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

import streamifier from 'streamifier';

@Injectable()
export class UploadService {
    constructor() {
        cloudinary.config({
            cloud_name:
                process.env.CLOUDINARY_CLOUD_NAME,

            api_key:
                process.env.CLOUDINARY_API_KEY,

            api_secret:
                process.env.CLOUDINARY_API_SECRET,
        });
    }
  extractPublicId(url: string) {
    const parts = url.split('/');

    const fileName = parts.pop();

    const folder = parts.pop();

    if (!fileName || !folder) {
      return '';
    }

    return `${folder}/${fileName.split('.')[0]}`;
  }

  async uploadImage(
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No image uploaded',
      );
    }

    return new Promise<any>((resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: 'nest-blogs',
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

      streamifier
        .createReadStream(file.buffer)
        .pipe(stream);
    });
  }

  async updateImage(
    file: Express.Multer.File,
    oldImageUrl: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No image uploaded',
      );
    }

    if (oldImageUrl) {
      const publicId =
        this.extractPublicId(
          oldImageUrl,
        );

      await cloudinary.uploader.destroy(
        publicId,
      );
    }

    return new Promise<any>((resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: 'nest-blogs',
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

      streamifier
        .createReadStream(file.buffer)
        .pipe(stream);
    });
  }
}