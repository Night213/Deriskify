import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { EMULoginDto } from './dto/emu-login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
    emergencyUnitLogin(loginDto: EMULoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    emergencyUnitRefreshToken(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
}
