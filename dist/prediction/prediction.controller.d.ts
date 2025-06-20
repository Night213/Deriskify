import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { AuthenticatedRequest } from '../shared/types/auth.types';
export declare class PredictionController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    predict(file: Express.Multer.File, body: CreatePredictionDto, req: AuthenticatedRequest): Promise<import("./entities/prediction.entity").PredictionEntity>;
    getMyPredictions(req: AuthenticatedRequest): Promise<import("./entities/prediction.entity").PredictionEntity[]>;
    getAllPredictions(): Promise<import("./entities/prediction.entity").PredictionEntity[]>;
}
