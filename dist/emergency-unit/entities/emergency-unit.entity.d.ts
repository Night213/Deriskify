import { UUID } from 'crypto';
import { EmergencyUnitStation } from 'src/shared/types/user.types';
export declare class EmergencyUnit {
    id: number;
    _id: UUID;
    username: string;
    name: string;
    phone: string;
    password: string;
    email: string;
    website: string;
    description: string;
    icon: string;
    stations: EmergencyUnitStation[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
