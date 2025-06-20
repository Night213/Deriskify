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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./entities/report.entity");
const s3_service_1 = require("../lib/services/s3.service");
const emergency_unit_entity_1 = require("../emergency-unit/entities/emergency-unit.entity");
let ReportService = class ReportService {
    reportRepository;
    emergencyUnitRepository;
    s3Service;
    constructor(reportRepository, emergencyUnitRepository, s3Service) {
        this.reportRepository = reportRepository;
        this.emergencyUnitRepository = emergencyUnitRepository;
        this.s3Service = s3Service;
    }
    async create(createReportDto, files, userId) {
        const emergencyUnit = await this.emergencyUnitRepository.findOne({
            where: { _id: createReportDto.emergencyUnitId },
        });
        if (!emergencyUnit) {
            throw new common_1.NotFoundException(`Emergency Unit with UUID ${createReportDto.emergencyUnitId} not found`);
        }
        let imageUrls = [];
        if (files && files.length > 0) {
            imageUrls = await this.s3Service.uploadMultipleFiles(files, 'reports');
        }
        const reportData = {
            description: createReportDto.description,
            images: imageUrls,
            user: { id: userId },
            emergencyUnit: { id: emergencyUnit.id },
            coordinates: {
                type: 'Point',
                coordinates: createReportDto.coordinates,
            },
        };
        const report = this.reportRepository.create(reportData);
        const savedReport = await this.reportRepository.save(report);
        return savedReport;
    }
    async findAll() {
        const reports = await this.reportRepository.find({
            relations: ['user', 'emergencyUnit'],
        });
        return reports;
    }
    async findOne(id) {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['user', 'emergencyUnit'],
        });
        if (!report) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }
    async findByUuid(_id) {
        const report = await this.reportRepository.findOne({
            where: { _id: _id },
            relations: ['user', 'emergencyUnit'],
        });
        if (!report) {
            throw new common_1.NotFoundException(`Report with UUID ${_id} not found`);
        }
        return report;
    }
    async findByUser(userId) {
        const reports = await this.reportRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'emergencyUnit'],
        });
        return reports;
    }
    async findByEmergencyUnit(emergencyUnitId) {
        const reports = await this.reportRepository.find({
            where: { emergencyUnit: { id: emergencyUnitId } },
            relations: ['user', 'emergencyUnit'],
        });
        return reports;
    }
    async update(id, updateReportDto) {
        const rawReport = await this.reportRepository.findOne({
            where: { id },
            relations: ['user', 'emergencyUnit'],
        });
        if (!rawReport) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
        Object.assign(rawReport, updateReportDto);
        const updatedReport = await this.reportRepository.save(rawReport);
        return updatedReport;
    }
    async remove(id) {
        const report = await this.findOne(id);
        if (report.images && report.images.length > 0) {
            for (const imageUrl of report.images) {
                try {
                    await this.s3Service.deleteFile(imageUrl);
                }
                catch (error) {
                    console.error(`Failed to delete image ${imageUrl}:`, error);
                }
            }
        }
        await this.reportRepository.remove(report);
    }
    async getSignedUploadUrls(fileNames, contentTypes) {
        if (fileNames.length !== contentTypes.length) {
            throw new Error('File names and content types arrays must have the same length');
        }
        const signedUrls = [];
        for (let i = 0; i < fileNames.length; i++) {
            const signedUrl = await this.s3Service.getSignedUploadUrl(fileNames[i], contentTypes[i], 'reports');
            signedUrls.push(signedUrl);
        }
        return signedUrls;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(1, (0, typeorm_1.InjectRepository)(emergency_unit_entity_1.EmergencyUnit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        s3_service_1.S3Service])
], ReportService);
//# sourceMappingURL=report.service.js.map