import { ExecutionContext, CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { EmergencyUnitService } from 'src/emergency-unit/emergency-unit.service';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';
export interface EMUAuthenticatedRequest extends Request {
    emu: EmergencyUnit;
}
export declare class EMUAuthGuard implements CanActivate {
    private readonly jwtAuthService;
    private readonly emergencyUnitService;
    constructor(jwtAuthService: JwtAuthService, emergencyUnitService: EmergencyUnitService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
