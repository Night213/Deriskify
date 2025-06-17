import { UUID } from 'crypto';
import { EmergencyUnit } from '../../emergency-unit/entities/emergency-unit.entity';
export declare class Instruction {
    id: number;
    _id: UUID;
    title: string;
    description: string;
    emergencyUnitId: number;
    emergencyUnit: EmergencyUnit;
    createdAt: Date;
    updatedAt: Date;
}
