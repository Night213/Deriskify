import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';
import { S3Service } from '../lib/services/s3.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { EmergencyUnitService } from '../emergency-unit/emergency-unit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, EmergencyUnit]),
    UserModule,
    JwtModule,
  ],
  controllers: [ReportController],
  providers: [ReportService, S3Service, JwtAuthService, EmergencyUnitService],
})
export class ReportModule {}
