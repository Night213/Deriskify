import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './lib/modules/database.module';
import { ConfigModule } from '@nestjs/config';
import { EmergencyUnitModule } from './emergency-unit/emergency-unit.module';
import { ReportModule } from './report/report.module';
import { InstructionModule } from './instruction/instruction.module';
import { PredictionModule } from './prediction/prediction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    EmergencyUnitModule,
    ReportModule,
    InstructionModule,
    PredictionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
