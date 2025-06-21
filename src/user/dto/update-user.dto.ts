import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// No changes needed, inherits from CreateUserDto
export class UpdateUserDto extends PartialType(CreateUserDto) {}
