import { ReportPriority } from 'src/shared/enums/report.enums';
import { EmergencyUnitListDto } from 'src/emergency-unit/dto/emergency-unit-list.dto';
import { RetrieveUserDto } from 'src/user/dto/retrieve-user.dto';
import { UUID } from 'node:crypto';
export declare class RetrieveReportDto {
    id: UUID;
    description: string;
    images: string[];
    status: ReportPriority;
    user: RetrieveUserDto;
    emergencyUnit: EmergencyUnitListDto;
    createdAt: Date;
    updatedAt: Date;
}
