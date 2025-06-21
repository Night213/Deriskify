import {
  IsNotEmpty,
  IsString,
  Length,
  IsStrongPassword,
  IsMobilePhone,
  IsOptional,
  IsArray,
} from 'class-validator';
import { IsEgyptianNationalId } from 'src/lib/validators/is-egyptian-national-id.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEgyptianNationalId()
  nationalId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'Phone number must be exactly 11 characters long',
  })
  @IsMobilePhone(
    'ar-EG',
    { strictMode: false },
    {
      message: 'Phone number must be a valid Egyptian mobile number',
    },
  )
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30, {
    message: 'City name must be between 2 and 30 characters long',
  })
  city: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  weight?: number;

  @IsOptional()
  height?: number;

  @IsOptional()
  @IsArray()
  chronicDiseases?: string[];

  @IsOptional()
  @IsArray()
  emergencyContacts?: string[];
}
