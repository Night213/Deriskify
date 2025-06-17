import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtAuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
