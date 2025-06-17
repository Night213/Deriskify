import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';
import { EmergencyUnitService } from 'src/emergency-unit/emergency-unit.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtAuthService,
    private readonly userService: UserService,
    private readonly emergencyUnitService: EmergencyUnitService,
  ) {}

  async validateEMU(
    username: string,
    password: string,
  ): Promise<EmergencyUnit> {
    const emu = await this.emergencyUnitService.findByUsername(username);
    if (!emu) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.emergencyUnitService.validatePassword(
      password,
      emu.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return emu;
  }

  async validateUser(phone: string, password: string): Promise<User> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async loginEMU(emu: EmergencyUnit) {
    const payload = {
      id: emu.id,
      name: emu.name,
      username: emu.username,
    };
    const tokens = await this.jwtService.generateTokensEMU(payload);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(user: User) {
    const payload = {
      id: user.nationalId,
      fullName: user.fullName,
      phone: user.phone,
    };
    const tokens = await this.jwtService.generateTokens(payload);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyToken(refreshToken);
      const user = await this.userService.findOne(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const newPayload = {
        id: user.nationalId,
        fullName: user.fullName,
        phone: user.phone,
      };
      const accessToken = await this.jwtService.refreshToken(
        refreshToken,
        newPayload,
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async refreshTokenEMU(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyTokenEMU(refreshToken);
      const emu = await this.emergencyUnitService.findOne(payload.id);
      if (!emu) {
        throw new UnauthorizedException('Emergency unit not found');
      }
      const newPayload = {
        id: emu.id,
        name: emu.name,
        username: emu.username,
      };
      const accessToken = await this.jwtService.refreshTokenEMU(
        refreshToken,
        newPayload,
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
