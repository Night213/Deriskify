import { User } from './user.entity';
export declare class UserProfile {
    id: number;
    birthDate: Date;
    gender: string;
    weight: number;
    height: number;
    address: string;
    city: string;
    chronicDiseases: string[];
    emergencyContacts: string[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
