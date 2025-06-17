import { ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtAuthService } from 'src/lib/services/jwt.service';
import { UserService } from '../../user/user.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtAuthService;
    private readonly userService;
    constructor(jwtAuthService: JwtAuthService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
