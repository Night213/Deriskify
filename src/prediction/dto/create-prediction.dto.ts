import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePredictionDto {
  @IsNotEmpty()
  @IsString()
  category: string;
}