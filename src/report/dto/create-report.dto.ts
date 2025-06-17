import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  emergencyUnitId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
