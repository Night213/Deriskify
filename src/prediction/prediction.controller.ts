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
import { PredictionResponseDto } from './dto/prediction-response.dto';

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
  ): Promise<PredictionResponseDto> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    if (!body.category || !body.categoryId) {
      throw new BadRequestException('Category and categoryId are required');
    }
    const prediction = await this.predictionService.predictAndSave(
      file,
      body.category,
      body.categoryId,
      req.user,
    );
    return {
      predictedPriority: prediction.predictedPriority,
      imageUrl: prediction.imageUrl,
    };
  }

  @Get('my-predictions')
  @UseGuards(JwtAuthGuard)
  async getMyPredictions(@Req() req: AuthenticatedRequest) {
    const predictions = await this.predictionService.findByUser(req.user.id);
    return predictions.map(prediction => ({
      id: prediction.id,
      category: prediction.category,
      predictedPriority: prediction.predictedPriority,
      imageName: prediction.imageName,
      imageUrl: prediction.imageUrl,
      createdAt: prediction.createdAt,
      user: prediction.user,
    }));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllPredictions(@Req() req: AuthenticatedRequest) {
    // If the logged-in user is an emergency unit, filter by their categoryId
    if (req.user && req.user.userType === 'EMERGENCY_UNIT') {
      const emu = await this.predictionService.getEmergencyUnitService().findOne(req.user.id);
      const predictions = await this.predictionService.findByEmergencyUnitCategory(emu._id);
      return predictions.map(prediction => ({
        id: prediction.id,
        category: prediction.category,
        predictedPriority: prediction.predictedPriority,
        imageName: prediction.imageName,
        imageUrl: prediction.imageUrl,
        createdAt: prediction.createdAt,
        user: prediction.user,
      }));
    }
    // Otherwise, return all predictions
    const predictions = await this.predictionService.findAll();
    return predictions.map(prediction => ({
      id: prediction.id,
      category: prediction.category,
      predictedPriority: prediction.predictedPriority,
      imageName: prediction.imageName,
      imageUrl: prediction.imageUrl,
      createdAt: prediction.createdAt,
      user: prediction.user,
    }));
  }
}
