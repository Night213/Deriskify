"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthService = class JwtAuthService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateTokensEMU(payload) {
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRATION || '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRATION || '14d',
            }),
        };
    }
    async generateTokens(payload) {
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRATION || '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRATION || '14d',
            }),
        };
    }
    async refreshTokenEMU(refreshToken, payload) {
        try {
            await this.verifyToken(refreshToken);
            return {
                accessToken: this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRATION || '1h',
                }),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Invalid refresh token');
        }
    }
    async refreshToken(refreshToken, payload) {
        try {
            await this.verifyToken(refreshToken);
            return {
                accessToken: this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: process.env.JWT_EXPIRATION || '1h',
                }),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Invalid refresh token');
        }
    }
    async verifyToken(token) {
        try {
            return await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async verifyTokenEMU(token) {
        try {
            return await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async decodeToken(token) {
        return await this.jwtService.decode(token);
    }
    async decodeTokenEMU(token) {
        return await this.jwtService.decode(token);
    }
};
exports.JwtAuthService = JwtAuthService;
exports.JwtAuthService = JwtAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthService);
//# sourceMappingURL=jwt.service.js.map