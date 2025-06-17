import { Expose, Transform } from 'class-transformer';
import { UUID } from 'node:crypto';

export class RetrieveInstructionDto {
  @Expose()
  @Transform(({ obj }: { obj: { _id: UUID } }) => obj._id)
  id: UUID;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
