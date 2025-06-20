import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictionEntity } from './entities/prediction.entity';
import axios from 'axios';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PredictionService {
  private readonly modelApiUrl: string;

  constructor(
    @InjectRepository(PredictionEntity)
    private readonly predictionRepository: Repository<PredictionEntity>,
    private readonly configService: ConfigService,
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
      if (typeof predictedPriority !== 'number') {
        throw new Error('Invalid response from prediction model');
      }

      const prediction = this.predictionRepository.create({
        category,
        predictedPriority,
        imageName: file.originalname,
        user,
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
}