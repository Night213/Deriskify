import { UUID } from 'crypto';
import { Expose, Transform } from 'class-transformer';

export class EmergencyUnitListDto {
  @Expose()
  numericId: number; // Add numeric id for debugging and backend use

  @Expose()
  @Transform(({ obj }: { obj: { _id: UUID } }) => obj._id)
  id: UUID;

  @Expose()
  name: string;

  @Expose()
  icon: string;
}
