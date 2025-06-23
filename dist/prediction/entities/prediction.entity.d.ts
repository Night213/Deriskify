import { User } from 'src/user/entities/user.entity';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';
export declare class PredictionEntity {
    id: number;
    category: string;
    categoryId: string | null;
    predictedPriority: number;
    imageName: string;
    imageUrl: string;
    createdAt: Date;
    user: User;
    emergencyUnit?: EmergencyUnit;
}
