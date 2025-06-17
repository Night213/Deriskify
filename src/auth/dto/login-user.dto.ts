import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsMobilePhone(
    'ar-EG',
    { strictMode: false },
    {
      message: 'Phone number must be a valid Egyptian mobile number',
    },
  )
  readonly phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
