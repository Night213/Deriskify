import { User } from 'src/user/entities/user.entity';
export declare class PredictionEntity {
    id: number;
    category: string;
    predictedPriority: number;
    imageName: string;
    createdAt: Date;
    user: User;
}
