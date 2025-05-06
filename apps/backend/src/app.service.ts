import { Injectable, UploadedFile } from '@nestjs/common';
import { getBucket, prisma, User } from 'src';
import { CreateUserDto } from './dto/create-user.dto';
import { GenerateImageDto } from './dto/generate-image.dto';
import cloudinary from './config/cloudinary.config';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateImage(
    data: GenerateImageDto,
    userId: string,
  ): Promise<{ url: string; posterUrl: string }> {
    try {
      const bucket = await getBucket();
      const fileName = `${Date.now()}-${data.image.originalname}`;

      const filePath = data.image.path;
      console.log('File path:', filePath);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File does not exist: ${filePath}`);
      }

      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        throw new Error(`Path is not a file: ${filePath}`);
      }

      console.log('File stats:', stats);

      // Upload to bucket
      const [file] = await bucket.upload(filePath, {
        destination: fileName,
        metadata: {
          contentType: data.image.mimetype,
        },
      });

      // bucket is private so expires in 7 days
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: 'posters',
        resource_type: 'image',
      });

      // poster url
      const posterUrl = cloudinary.url(uploadResponse.public_id, {
        transformation: [
          { width: 1200, height: 630, crop: 'fill' },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 50,
              font_weight: 'bold',
              text: data.description,
            },
            color: 'white',
          },
          { effect: 'shadow:50' },
        ],
        secure: true,
      });

      await prisma.poster.create({
        data: {
          description: data.description,
          originalUrl: url,
          posterUrl: posterUrl,
          userId: userId,
        },
      });

      return {
        url,
        posterUrl,
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  async getUserPosters(userId: string) {
    return prisma.poster.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
