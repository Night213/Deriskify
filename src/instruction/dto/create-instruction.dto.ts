import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstructionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
