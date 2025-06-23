import { Repository } from 'typeorm';
import { PredictionEntity } from './entities/prediction.entity';
import { ConfigService } from '@nestjs/config';
import { EmergencyUnitService } from '../emergency-unit/emergency-unit.service';
export declare class PredictionService {
    private readonly predictionRepository;
    private readonly configService;
    private readonly emergencyUnitService;
    private readonly modelApiUrl;
    constructor(predictionRepository: Repository<PredictionEntity>, configService: ConfigService, emergencyUnitService: EmergencyUnitService);
    predictAndSave(file: Express.Multer.File, category: string, categoryId: string, user: any): Promise<PredictionEntity>;
    findByUser(userId: number): Promise<PredictionEntity[]>;
    findAll(): Promise<PredictionEntity[]>;
    findByEmergencyUnit(emergencyUnitId: number): Promise<PredictionEntity[]>;
    findByEmergencyUnitCategory(categoryId: string): Promise<PredictionEntity[]>;
    getEmergencyUnitService(): EmergencyUnitService;
}
