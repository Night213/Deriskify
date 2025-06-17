import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructionService } from './instruction.service';
import { InstructionController } from './instruction.controller';
import { Instruction } from './entities/instruction.entity';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { EmergencyUnitModule } from 'src/emergency-unit/emergency-unit.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instruction]),
    EmergencyUnitModule,
    JwtModule,
  ],
  controllers: [InstructionController],
  providers: [InstructionService, JwtAuthService],
  exports: [InstructionService],
})
export class InstructionModule {}
