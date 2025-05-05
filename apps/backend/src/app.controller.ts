import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { GenerateImageDto } from './dto/generate-image.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(JwtAuthGuard)
  @Post('/generate')
  @UseInterceptors(FileInterceptor('image'))
  async generateImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() generateImageDto: GenerateImageDto,
    @Request() req,
  ): Promise<{ url: string; posterUrl: string }> {
    generateImageDto.image = file;
    return this.appService.generateImage(generateImageDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/posters')
  async getUserPosters(@Request() req) {
    return this.appService.getUserPosters(req.user.id);
  }
}
