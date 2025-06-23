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
const report_enums_1 = require("../shared/enums/report.enums");
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
    async findByEmergencyUnit(emergencyUnitId, status) {
        const reports = await this.reportRepository.find({
            where: { emergencyUnit: { id: emergencyUnitId }, status },
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
        const report = await this.findByUuid(id);
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
    async acceptReport(id) {
        try {
            const report = await this.reportRepository.findOne({
                where: { _id: id },
                relations: ['user', 'emergencyUnit'],
            });
            if (!report) {
                throw new common_1.NotFoundException(`Report with ID ${id} not found`);
            }
            if (report.status !== report_enums_1.ReportStatus.ACTIVE) {
                throw new common_1.BadRequestException(`Report with ID ${id} is not in an active state`);
            }
            report.status = report_enums_1.ReportStatus.ACCEPTED;
            const updatedReport = await this.reportRepository.save(report);
            return updatedReport;
        }
        catch (error) {
            console.error(`Error accepting report with ID ${id}:`, error);
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
    }
    async getWeeklyReportStats(emergencyUnitId) {
        try {
            const query = this.reportRepository
                .createQueryBuilder('report')
                .select('report.createdAt')
                .addSelect('report.id');
            if (emergencyUnitId) {
                query.leftJoin('report.emergencyUnit', 'emergencyUnit');
                query.where('emergencyUnit.id = :emergencyUnitId', {
                    emergencyUnitId,
                });
            }
            const reports = await query.getMany();
            const dayMap = {
                0: 'Sun',
                1: 'Mon',
                2: 'Tue',
                3: 'Wed',
                4: 'Thu',
                5: 'Fri',
                6: 'Sat',
            };
            const dayCounts = {
                Mon: 0,
                Tue: 0,
                Wed: 0,
                Thu: 0,
                Fri: 0,
                Sat: 0,
                Sun: 0,
            };
            reports.forEach((report) => {
                const date = new Date(report.createdAt);
                const dayIndex = date.getDay();
                const dayOfWeek = dayMap[dayIndex];
                if (dayOfWeek && dayOfWeek in dayCounts) {
                    dayCounts[dayOfWeek] += 1;
                }
            });
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const formattedResults = daysOfWeek.map((day) => ({
                day,
                count: dayCounts[day],
            }));
            return formattedResults;
        }
        catch (error) {
            console.error('Error fetching weekly report stats:', error);
            return [
                { day: 'Mon', count: 0 },
                { day: 'Tue', count: 0 },
                { day: 'Wed', count: 0 },
                { day: 'Thu', count: 0 },
                { day: 'Fri', count: 0 },
                { day: 'Sat', count: 0 },
                { day: 'Sun', count: 0 },
            ];
        }
    }
    async getEmergencyUnitStats(emergencyUnitId) {
        try {
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const totalReportersQuery = this.reportRepository
                .createQueryBuilder('report')
                .leftJoin('report.user', 'user')
                .leftJoin('report.emergencyUnit', 'emergencyUnit')
                .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
                .select('COUNT(DISTINCT user.id)', 'count');
            const totalReportersRaw = (await totalReportersQuery.getRawOne());
            const totalReporters = parseInt(totalReportersRaw?.count ?? '0', 10);
            const newReportersQuery = this.reportRepository
                .createQueryBuilder('report')
                .leftJoin('report.user', 'user')
                .leftJoin('report.emergencyUnit', 'emergencyUnit')
                .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
                .andWhere('report.createdAt >= :firstDayOfMonth', { firstDayOfMonth })
                .select('COUNT(DISTINCT user.id)', 'count');
            const newReportersRaw = (await newReportersQuery.getRawOne());
            const newReporters = parseInt(newReportersRaw?.count ?? '0', 10);
            const reporterChangePercentage = totalReporters > 0
                ? Math.round((newReporters / totalReporters) * 100)
                : 0;
            const completedReportsQuery = this.reportRepository
                .createQueryBuilder('report')
                .leftJoin('report.emergencyUnit', 'emergencyUnit')
                .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
                .andWhere('report.status = :status', { status: report_enums_1.ReportStatus.ACCEPTED })
                .select('COUNT(report.id)', 'count');
            const completedReportsRaw = (await completedReportsQuery.getRawOne());
            const completedReports = parseInt(completedReportsRaw?.count ?? '0', 10);
            const newCompletedReportsQuery = this.reportRepository
                .createQueryBuilder('report')
                .leftJoin('report.emergencyUnit', 'emergencyUnit')
                .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
                .andWhere('report.status = :status', { status: report_enums_1.ReportStatus.ACCEPTED })
                .andWhere('report.updatedAt >= :firstDayOfMonth', { firstDayOfMonth })
                .select('COUNT(report.id)', 'count');
            const newCompletedReportsRaw = (await newCompletedReportsQuery.getRawOne());
            const newCompletedReports = parseInt(newCompletedReportsRaw?.count ?? '0', 10);
            const completedReportsChangePercentage = completedReports > 0
                ? Math.round((newCompletedReports / completedReports) * 100) * -1
                : 0;
            const activeReportsQuery = this.reportRepository
                .createQueryBuilder('report')
                .leftJoin('report.emergencyUnit', 'emergencyUnit')
                .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
                .andWhere('report.status = :status', { status: report_enums_1.ReportStatus.ACTIVE })
                .select('COUNT(report.id)', 'count');
            const activeReportsRaw = (await activeReportsQuery.getRawOne());
            const activeReports = parseInt(activeReportsRaw?.count ?? '0', 10);
            return {
                totalReporters,
                reporterChangePercentage,
                completedReports,
                completedReportsChangePercentage,
                activeReports,
            };
        }
        catch (error) {
            console.error('Error fetching emergency unit stats:', error);
            return {
                totalReporters: 0,
                reporterChangePercentage: 0,
                completedReports: 0,
                completedReportsChangePercentage: 0,
                activeReports: 0,
            };
        }
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