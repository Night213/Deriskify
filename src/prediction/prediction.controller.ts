import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Get,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { JwtAuthService } from '../lib/services/jwt.service';
import { EmergencyUnitService } from '../emergency-unit/emergency-unit.service';
import { UserService } from '../user/user.service';
import { UserType } from '../shared/enums/user.enums';
import { AuthenticatedRequest } from '../shared/types/auth.types';
import { PredictionResponseDto } from './dto/prediction-response.dto';

@Controller('prediction')
export class PredictionController {
  constructor(
    private readonly predictionService: PredictionService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly userService: UserService,
    private readonly emergencyUnitService: EmergencyUnitService,
  ) {}

  // Helper to attach user/emergency unit to request
  private async attachAuthEntity(req: any): Promise<{ userType: string; entity: any }> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    // Try user first
    let decoded: any = await this.jwtAuthService.decodeToken(token);
    if (decoded && decoded.id) {
      try {
        const user = await this.userService.findOne(decoded.id);
        return { userType: UserType.CLIENT, entity: user };
      } catch {}
    }
    // Try emergency unit
    decoded = await this.jwtAuthService.decodeTokenEMU(token);
    if (decoded && decoded.id) {
      try {
        const emu = await this.emergencyUnitService.findOne(decoded.id);
        return { userType: UserType.EMERGENCY_UNIT, entity: emu };
      } catch {}
    }
    throw new BadRequestException('Invalid or unknown token');
  }

  @Post('predict')
  @UseInterceptors(FileInterceptor('file'))
  async predict(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePredictionDto,
    @Req() req: any,
  ): Promise<PredictionResponseDto> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    if (!body.category || !body.categoryId) {
      throw new BadRequestException('Category and categoryId are required');
    }
    const { userType, entity } = await this.attachAuthEntity(req);
    const prediction = await this.predictionService.predictAndSave(
      file,
      body.category,
      body.categoryId,
      { ...entity, userType },
    );
    return {
      predictedPriority: prediction.predictedPriority,
      imageUrl: prediction.imageUrl,
    };
  }

  @Get('my-predictions')
  async getMyPredictions(@Req() req: any) {
    const { userType, entity } = await this.attachAuthEntity(req);
    if (userType === UserType.CLIENT) {
      const predictions = await this.predictionService.findByUser(entity.id);
      return predictions.map(prediction => ({
        id: prediction.id,
        category: prediction.category,
        predictedPriority: prediction.predictedPriority,
        imageName: prediction.imageName,
        imageUrl: prediction.imageUrl,
        createdAt: prediction.createdAt,
        user: prediction.user,
        categoryId: prediction.categoryId,
      }));
    } else if (userType === UserType.EMERGENCY_UNIT) {
      const predictions = await this.predictionService.findByEmergencyUnit(entity.id);
      return predictions.map(prediction => ({
        id: prediction.id,
        category: prediction.category,
        predictedPriority: prediction.predictedPriority,
        imageName: prediction.imageName,
        imageUrl: prediction.imageUrl,
        createdAt: prediction.createdAt,
        user: prediction.user,
        categoryId: prediction.categoryId,
      }));
    }
    throw new BadRequestException('Unknown user type');
  }

  @Get()
  async getAllPredictions(@Req() req: any) {
    const { userType, entity } = await this.attachAuthEntity(req);
    if (userType === UserType.EMERGENCY_UNIT) {
      const predictions = await this.predictionService.findByEmergencyUnitCategory(entity._id);
      return predictions.map(prediction => ({
        id: prediction.id,
        category: prediction.category,
        predictedPriority: prediction.predictedPriority,
        imageName: prediction.imageName,
        imageUrl: prediction.imageUrl,
        createdAt: prediction.createdAt,
        user: prediction.user,
        categoryId: prediction.categoryId,
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
      categoryId: prediction.categoryId,
    }));
  }
}
