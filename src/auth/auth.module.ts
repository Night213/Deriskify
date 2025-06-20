import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { EmergencyUnitModule } from 'src/emergency-unit/emergency-unit.module';

@Module({
  imports: [
    UserModule,
    EmergencyUnitModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '5h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService],
  exports: [JwtAuthService], // <-- export JwtAuthService for use in other modules
})
export class AuthModule {}
