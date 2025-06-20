import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

import { Transform } from 'class-transformer';

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

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Transform(({ value }: { value: number[] }) => value.map(Number))
  coordinates: [number, number];
}
