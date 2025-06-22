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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const report_service_1 = require("./report.service");
const create_report_dto_1 = require("./dto/create-report.dto");
const update_report_dto_1 = require("./dto/update-report.dto");
const retrieve_report_dto_1 = require("./dto/retrieve-report.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const emu_auth_guard_1 = require("../auth/guards/emu-auth.guard");
const class_transformer_1 = require("class-transformer");
const report_enums_1 = require("../shared/enums/report.enums");
const emergency_unit_stats_dto_1 = require("./dto/emergency-unit-stats.dto");
const statistics_response_dto_1 = require("./dto/statistics-response.dto");
let ReportController = class ReportController {
    reportService;
    constructor(reportService) {
        this.reportService = reportService;
    }
    async create(createReportDto, files, req) {
        if (!files || files.length === 0) {
            throw new Error('At least one image is required');
        }
        const createdReport = await this.reportService.create(createReportDto, files, req.user.id);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, createdReport, {
            excludeExtraneousValues: true,
        });
    }
    async findAll() {
        const reports = await this.reportService.findAll();
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, reports, {
            excludeExtraneousValues: true,
        });
    }
    async findMyReports(req) {
        const reports = await this.reportService.findByUser(req.user.id);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, reports, {
            excludeExtraneousValues: true,
        });
    }
    async findMyEmergencyUnitReports(req, status = report_enums_1.ReportStatus.ACTIVE) {
        if (!Object.values(report_enums_1.ReportStatus).includes(status)) {
            throw new Error('Invalid report status');
        }
        const emergencyUnitId = req.emu.id;
        const reports = await this.reportService.findByEmergencyUnit(emergencyUnitId, status);
        const stats = await this.reportService.getEmergencyUnitStats(emergencyUnitId);
        return {
            reports: (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, reports, {
                excludeExtraneousValues: true,
            }),
            stats: (0, class_transformer_1.plainToInstance)(emergency_unit_stats_dto_1.EmergencyUnitStatsDto, stats, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async findEmergencyUnitReportById(id) {
        const report = await this.reportService.findByUuid(id);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, report, {
            excludeExtraneousValues: true,
        });
    }
    async findOne(id) {
        const report = await this.reportService.findByUuid(id);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, report, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, updateReportDto) {
        const updatedReport = await this.reportService.update(id, updateReportDto);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, updatedReport, {
            excludeExtraneousValues: true,
        });
    }
    async remove(id) {
        await this.reportService.remove(id);
        return { message: 'Report deleted successfully' };
    }
    async acceptReport(id) {
        const acceptedReport = await this.reportService.acceptReport(id);
        return (0, class_transformer_1.plainToInstance)(retrieve_report_dto_1.RetrieveReportDto, acceptedReport, {
            excludeExtraneousValues: true,
        });
    }
    async getStatistics(req) {
        const emergencyUnitId = req.emu.id;
        const weeklyStats = await this.reportService.getWeeklyReportStats(emergencyUnitId);
        return (0, class_transformer_1.plainToInstance)(statistics_response_dto_1.StatisticsResponseDto, { weeklyStats }, { excludeExtraneousValues: true });
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findMyReports", null);
__decorate([
    (0, common_1.Get)('emergency-unit'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findMyEmergencyUnitReports", null);
__decorate([
    (0, common_1.Get)('emergency-unit/:id'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findEmergencyUnitReportById", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('user/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_report_dto_1.UpdateReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('user/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "acceptReport", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getStatistics", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map