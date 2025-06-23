import { JwtAuthService } from 'src/lib/services/jwt.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';
import { EmergencyUnitService } from 'src/emergency-unit/emergency-unit.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly emergencyUnitService;
    constructor(jwtService: JwtAuthService, userService: UserService, emergencyUnitService: EmergencyUnitService);
    validateEMU(username: string, password: string): Promise<EmergencyUnit>;
    validateUser(phone: string, password: string): Promise<User>;
    loginEMU(emu: EmergencyUnit): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    refreshTokenEMU(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
