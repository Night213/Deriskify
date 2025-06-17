import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyUnitDto } from './create-emergency-unit.dto';

export class UpdateEmergencyUnitDto extends PartialType(CreateEmergencyUnitDto) {}
