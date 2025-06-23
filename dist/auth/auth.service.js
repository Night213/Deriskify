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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../lib/services/jwt.service");
const user_service_1 = require("../user/user.service");
const emergency_unit_service_1 = require("../emergency-unit/emergency-unit.service");
let AuthService = class AuthService {
    jwtService;
    userService;
    emergencyUnitService;
    constructor(jwtService, userService, emergencyUnitService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.emergencyUnitService = emergencyUnitService;
    }
    async validateEMU(username, password) {
        const emu = await this.emergencyUnitService.findByUsername(username);
        if (!emu) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.emergencyUnitService.validatePassword(password, emu.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return emu;
    }
    async validateUser(phone, password) {
        const user = await this.userService.findByPhone(phone);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.userService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async loginEMU(emu) {
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
    async login(user) {
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
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyToken(refreshToken);
            const user = await this.userService.findOne(payload.id);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const newPayload = {
                id: user.nationalId,
                fullName: user.fullName,
                phone: user.phone,
            };
            const accessToken = await this.jwtService.refreshToken(refreshToken, newPayload);
            return accessToken;
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async refreshTokenEMU(refreshToken) {
        try {
            const payload = await this.jwtService.verifyTokenEMU(refreshToken);
            const emu = await this.emergencyUnitService.findOne(payload.id);
            if (!emu) {
                throw new common_1.UnauthorizedException('Emergency unit not found');
            }
            const newPayload = {
                id: emu.id,
                name: emu.name,
                username: emu.username,
            };
            const accessToken = await this.jwtService.refreshTokenEMU(refreshToken, newPayload);
            return accessToken;
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtAuthService,
        user_service_1.UserService,
        emergency_unit_service_1.EmergencyUnitService])
], AuthService);
//# sourceMappingURL=auth.service.js.map