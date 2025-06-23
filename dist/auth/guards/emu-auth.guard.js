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
exports.EMUAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../lib/services/jwt.service");
const emergency_unit_service_1 = require("../../emergency-unit/emergency-unit.service");
let EMUAuthGuard = class EMUAuthGuard {
    jwtAuthService;
    emergencyUnitService;
    constructor(jwtAuthService, emergencyUnitService) {
        this.jwtAuthService = jwtAuthService;
        this.emergencyUnitService = emergencyUnitService;
    }
    async canActivate(context) {
        const request = context
            .switchToHttp()
            .getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Invalid or missing token');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = await this.jwtAuthService.verifyTokenEMU(token);
            if (!decoded || !decoded.id) {
                throw new common_1.UnauthorizedException('Invalid token payload');
            }
            const emu = await this.emergencyUnitService.findOne(decoded.id);
            if (!emu) {
                throw new common_1.UnauthorizedException('Emergency unit not found');
            }
            request.emu = emu;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.EMUAuthGuard = EMUAuthGuard;
exports.EMUAuthGuard = EMUAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtAuthService,
        emergency_unit_service_1.EmergencyUnitService])
], EMUAuthGuard);
//# sourceMappingURL=emu-auth.guard.js.map