import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../shared/types/auth.types';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post('predict')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async predict(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePredictionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    if (!body.category) {
      throw new BadRequestException('Category is required');
    }
    return this.predictionService.predictAndSave(file, body.category, req.user);
  }

  @Get('my-predictions')
  @UseGuards(JwtAuthGuard)
  async getMyPredictions(@Req() req: AuthenticatedRequest) {
    return this.predictionService.findByUser(req.user.id);
  }

  @Get()
  async getAllPredictions() {
    return this.predictionService.findAll();
  }
}
