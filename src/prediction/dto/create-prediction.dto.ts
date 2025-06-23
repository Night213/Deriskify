import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePredictionDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string; // EmergencyUnit UUID

  @IsNotEmpty()
  @IsString()
  category: string; // Human-readable name (optional, for display)
}