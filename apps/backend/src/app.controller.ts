import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { GenerateImageDto } from './dto/generate-image.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  async getUsers(): Promise<User[]> {
    const users = await this.appService.getUsers();
    return users;
  }

  @Get('/user/:id')
  async getUser(@Param('id') userId: string): Promise<User> {
    const user = await this.appService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/user')
  async createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.appService.createUser(createUserDto);
    return user;
  }

  @Post('/generate')
  async generateImage(
    @Body()
    generateImageDto: GenerateImageDto,
  ): Promise<string> {
    const fileURl = await this.appService.generateImage(generateImageDto);
    return fileURl;
  }
}
