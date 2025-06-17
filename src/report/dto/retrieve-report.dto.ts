import { Expose, Transform, Type } from 'class-transformer';

import { ReportPriority } from 'src/shared/enums/report.enums';
import { EmergencyUnitListDto } from 'src/emergency-unit/dto/emergency-unit-list.dto';
import { RetrieveUserDto } from 'src/user/dto/retrieve-user.dto';
import { UUID } from 'node:crypto';

export class RetrieveReportDto {
  @Expose()
  @Transform(({ obj }: { obj: { _id: UUID } }) => obj._id)
  id: UUID;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  @Expose()
  status: ReportPriority;

  @Expose()
  @Type(() => RetrieveUserDto)
  user: RetrieveUserDto;

  @Expose()
  @Type(() => EmergencyUnitListDto)
  emergencyUnit: EmergencyUnitListDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
