import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtEMUPayload } from 'src/lib/types/jwt.types';
export declare class JwtAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateTokensEMU(payload: JwtEMUPayload): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(payload: JwtPayload): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokenEMU(refreshToken: string, payload: JwtEMUPayload): Promise<{
        accessToken: string;
    }>;
    refreshToken(refreshToken: string, payload: JwtPayload): Promise<{
        accessToken: string;
    }>;
    verifyToken(token: string): Promise<JwtPayload>;
    verifyTokenEMU(token: string): Promise<JwtEMUPayload>;
    decodeToken(token: string): Promise<JwtPayload>;
    decodeTokenEMU(token: string): Promise<JwtEMUPayload>;
}
