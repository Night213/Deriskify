import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { PredictionEntity } from './entities/prediction.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { EmergencyUnitModule } from '../emergency-unit/emergency-unit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PredictionEntity]),
    AuthModule,
    UserModule,
    EmergencyUnitModule,
  ],
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
})
export class PredictionModule {}
