import { Injectable, UploadedFile } from '@nestjs/common';
import { getBucket, prisma, User } from 'src';
import { CreateUserDto } from './dto/create-user.dto';
import { GenerateImageDto } from './dto/generate-image.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });
    return user;
  }

  async generateImage(data: GenerateImageDto): Promise<string> {
    getBucket();
    return 'hello';
  }
}
