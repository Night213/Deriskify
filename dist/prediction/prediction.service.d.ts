import { Repository } from 'typeorm';
import { PredictionEntity } from './entities/prediction.entity';
import { ConfigService } from '@nestjs/config';
export declare class PredictionService {
    private readonly predictionRepository;
    private readonly configService;
    private readonly modelApiUrl;
    constructor(predictionRepository: Repository<PredictionEntity>, configService: ConfigService);
    predictAndSave(file: Express.Multer.File, category: string, user: any): Promise<PredictionEntity>;
    findByUser(userId: number): Promise<PredictionEntity[]>;
    findAll(): Promise<PredictionEntity[]>;
}
