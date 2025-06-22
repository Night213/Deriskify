import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictionEntity } from './entities/prediction.entity';
import axios from 'axios';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';
import { EmergencyUnitService } from '../emergency-unit/emergency-unit.service';
import { UserType } from '../shared/enums/user.enums';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';

@Injectable()
export class PredictionService {
  private readonly modelApiUrl: string;

  constructor(
    @InjectRepository(PredictionEntity)
    private readonly predictionRepository: Repository<PredictionEntity>,
    private readonly configService: ConfigService,
    private readonly emergencyUnitService: EmergencyUnitService, // Inject EmergencyUnitService
  ) {
    this.modelApiUrl = this.configService.get<string>('API_MODEL')!;
  }

  async predictAndSave(
    file: Express.Multer.File,
    category: string,
    user: any,
  ): Promise<PredictionEntity> {
    try {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname);
      formData.append('category', category);

      const response = await axios.post(this.modelApiUrl, formData, {
        headers: formData.getHeaders(),
      });

      const predictedPriority = response.data?.predicted_priority;
      const imageUrl = response.data?.image_url;
      if (typeof predictedPriority !== 'number' || !imageUrl) {
        throw new Error('Invalid response from prediction model');
      }

      // Ensure imageUrl is a full URL
      let fullImageUrl = imageUrl;
      if (imageUrl && !imageUrl.startsWith('http')) {
        // Remove leading slash if present
        const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
        const apiBase = this.modelApiUrl.replace(/\/predict-priority.*/, '');
        fullImageUrl = `${apiBase}/${cleanPath}`;
      }

      let emergencyUnit: EmergencyUnit | undefined = undefined;
      if (user.userType === UserType.EMERGENCY_UNIT) {
        emergencyUnit = await this.emergencyUnitService.findOne(user.id);
      }
      const prediction = this.predictionRepository.create({
        category,
        predictedPriority,
        imageName: file.originalname,
        imageUrl: fullImageUrl,
        user,
        emergencyUnit, // Associate if present
      });
      return await this.predictionRepository.save(prediction);
    } catch (error) {
      throw new InternalServerErrorException(
        error.response?.data?.error || error.message || 'Prediction failed',
      );
    }
  }

  async findByUser(userId: number): Promise<PredictionEntity[]> {
    return this.predictionRepository.find({ where: { user: { id: userId } } });
  }

  async findAll() {
    return this.predictionRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async findByEmergencyUnit(emergencyUnitId: number): Promise<PredictionEntity[]> {
    return this.predictionRepository.find({ where: { emergencyUnit: { id: emergencyUnitId } }, relations: ['emergencyUnit', 'user'] });
  }
}