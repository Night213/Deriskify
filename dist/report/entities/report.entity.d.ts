import { UUID } from 'crypto';
import { User } from '../../user/entities/user.entity';
import { EmergencyUnit } from '../../emergency-unit/entities/emergency-unit.entity';
import { ReportPriority } from '../../shared/enums/report.enums';
export declare class Report {
    id: number;
    _id: UUID;
    description: string;
    images: string[];
    coordinates: {
        type: 'Point';
        coordinates: [number, number];
    };
    priority: ReportPriority;
    user: User;
    emergencyUnit: EmergencyUnit;
    createdAt: Date;
    updatedAt: Date;
}
