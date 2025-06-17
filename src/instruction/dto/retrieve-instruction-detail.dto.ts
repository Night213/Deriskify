import { Expose, Transform } from 'class-transformer';
import { UUID } from 'node:crypto';

class EmergencyUnitDto {
  @Expose()
  @Transform(({ obj }: { obj: { _id: UUID } }) => obj._id)
  id: UUID;

  @Expose()
  name: string;
}

export class RetrieveInstructionDto {
  @Expose()
  @Transform(({ obj }: { obj: { _id: UUID } }) => obj._id)
  id: UUID;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  emergencyUnit: EmergencyUnitDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
