import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { AuthenticatedRequest } from '../shared/types/auth.types';
import { PredictionResponseDto } from './dto/prediction-response.dto';
export declare class PredictionController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    predict(file: Express.Multer.File, body: CreatePredictionDto, req: AuthenticatedRequest): Promise<PredictionResponseDto>;
    getMyPredictions(req: AuthenticatedRequest): Promise<{
        id: number;
        category: string;
        predictedPriority: number;
        imageName: string;
        imageUrl: string;
        createdAt: Date;
        user: import("../user/entities/user.entity").User;
    }[]>;
    getAllPredictions(req: AuthenticatedRequest): Promise<{
        id: number;
        category: string;
        predictedPriority: number;
        imageName: string;
        imageUrl: string;
        createdAt: Date;
        user: import("../user/entities/user.entity").User;
    }[]>;
}
