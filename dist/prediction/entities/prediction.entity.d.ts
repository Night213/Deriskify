import { User } from '../../user/entities/user.entity';
import { EmergencyUnit } from '../../emergency-unit/entities/emergency-unit.entity';
export declare class PredictionEntity {
    id: number;
    category: string;
    predictedPriority: number;
    imageName: string;
    imageUrl: string;
    createdAt: Date;
    user: User;
    emergencyUnit?: EmergencyUnit;
}
