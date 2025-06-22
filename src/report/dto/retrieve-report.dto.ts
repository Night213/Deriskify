import { Expose, Transform, Type } from 'class-transformer';

import { ReportPriority, ReportStatus } from 'src/shared/enums/report.enums';
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
  priority: ReportPriority;

  @Expose()
  @Type(() => RetrieveUserDto)
  user: RetrieveUserDto;

  @Expose()
  @Type(() => EmergencyUnitListDto)
  emergencyUnit: EmergencyUnitListDto;

  @Expose()
  @Transform(
    ({
      obj,
    }: {
      obj: { coordinates: { type: 'Point'; coordinates: [number, number] } };
    }) => {
      return obj.coordinates.coordinates || [-1, -1];
    },
  )
  coordinates: [number, number];

  @Expose()
  status: ReportStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
