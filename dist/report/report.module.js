"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const report_controller_1 = require("./report.controller");
const typeorm_1 = require("@nestjs/typeorm");
const report_entity_1 = require("./entities/report.entity");
const emergency_unit_entity_1 = require("../emergency-unit/entities/emergency-unit.entity");
const s3_service_1 = require("../lib/services/s3.service");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_service_1 = require("../lib/services/jwt.service");
const emergency_unit_service_1 = require("../emergency-unit/emergency-unit.service");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([report_entity_1.Report, emergency_unit_entity_1.EmergencyUnit]),
            user_module_1.UserModule,
            jwt_1.JwtModule,
        ],
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService, s3_service_1.S3Service, jwt_service_1.JwtAuthService, emergency_unit_service_1.EmergencyUnitService],
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map