import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { EmergencyUnitService } from 'src/emergency-unit/emergency-unit.service';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';

export interface EMUAuthenticatedRequest extends Request {
  emu: EmergencyUnit;
}

@Injectable()
export class EMUAuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly emergencyUnitService: EmergencyUnitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<EMUAuthenticatedRequest>();

    // Extract Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token: string = authHeader.split(' ')[1];
    try {
      const decoded = await this.jwtAuthService.verifyTokenEMU(token);

      if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Fetch EMU from database
      const emu = await this.emergencyUnitService.findOne(decoded.id);
      if (!emu) {
        throw new UnauthorizedException('Emergency unit not found');
      }

      // Attach EMU to request
      request.emu = emu;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
