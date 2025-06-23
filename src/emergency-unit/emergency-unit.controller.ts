import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmergencyUnitService } from './emergency-unit.service';
import { CreateEmergencyUnitDto } from './dto/create-emergency-unit.dto';
import { UpdateEmergencyUnitDto } from './dto/update-emergency-unit.dto';
import { EmergencyUnitListDto } from './dto/emergency-unit-list.dto';
import { plainToInstance } from 'class-transformer';

@Controller('emergency-units')
export class EmergencyUnitController {
  constructor(private readonly emergencyUnitService: EmergencyUnitService) {}

  @Get()
  async findAll(): Promise<EmergencyUnitListDto[]> {
    const emergencyUnits = await this.emergencyUnitService.findAll();
    return plainToInstance(EmergencyUnitListDto, emergencyUnits, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  @Post()
  create(@Body() createEmergencyUnitDto: CreateEmergencyUnitDto) {
    return this.emergencyUnitService.create(createEmergencyUnitDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyUnitService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmergencyUnitDto: UpdateEmergencyUnitDto,
  ) {
    return this.emergencyUnitService.update(+id, updateEmergencyUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyUnitService.remove(+id);
  }
}
