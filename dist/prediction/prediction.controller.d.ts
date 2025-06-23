import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { JwtAuthService } from '../lib/services/jwt.service';
import { EmergencyUnitService } from '../emergency-unit/emergency-unit.service';
import { UserService } from '../user/user.service';
import { PredictionResponseDto } from './dto/prediction-response.dto';
export declare class PredictionController {
    private readonly predictionService;
    private readonly jwtAuthService;
    private readonly userService;
    private readonly emergencyUnitService;
    constructor(predictionService: PredictionService, jwtAuthService: JwtAuthService, userService: UserService, emergencyUnitService: EmergencyUnitService);
    private attachAuthEntity;
    predict(file: Express.Multer.File, body: CreatePredictionDto, req: any): Promise<PredictionResponseDto>;
    getMyPredictions(req: any): Promise<{
        id: number;
        category: string;
        predictedPriority: number;
        imageName: string;
        imageUrl: string;
        createdAt: Date;
        user: import("../user/entities/user.entity").User;
        categoryId: string | null;
    }[]>;
    getAllPredictions(req: any): Promise<{
        id: number;
        category: string;
        predictedPriority: number;
        imageName: string;
        imageUrl: string;
        createdAt: Date;
        user: import("../user/entities/user.entity").User;
        categoryId: string | null;
    }[]>;
}
