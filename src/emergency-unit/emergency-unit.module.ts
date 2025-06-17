import { Module } from '@nestjs/common';
import { EmergencyUnitService } from './emergency-unit.service';
import { EmergencyUnitController } from './emergency-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyUnit } from './entities/emergency-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyUnit])],
  controllers: [EmergencyUnitController],
  providers: [EmergencyUnitService],
  exports: [EmergencyUnitService],
})
export class EmergencyUnitModule {}
