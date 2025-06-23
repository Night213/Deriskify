import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { S3Service } from '../lib/services/s3.service';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';
import { ReportStatus } from 'src/shared/enums/report.enums';
export declare class ReportService {
    private reportRepository;
    private emergencyUnitRepository;
    private s3Service;
    constructor(reportRepository: Repository<Report>, emergencyUnitRepository: Repository<EmergencyUnit>, s3Service: S3Service);
    create(createReportDto: CreateReportDto, files: Express.Multer.File[], userId: number): Promise<Report>;
    findAll(): Promise<Report[]>;
    findOne(id: number): Promise<Report>;
    findByUuid(_id: string): Promise<Report>;
    findByUser(userId: number): Promise<Report[]>;
    findByEmergencyUnit(emergencyUnitId: number, status: ReportStatus): Promise<Report[]>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<Report>;
    remove(id: UUID): Promise<void>;
    getSignedUploadUrls(fileNames: string[], contentTypes: string[]): Promise<string[]>;
    acceptReport(id: UUID): Promise<Report>;
    getWeeklyReportStats(emergencyUnitId?: number): Promise<{
        day: string;
        count: number;
    }[]>;
    getEmergencyUnitStats(emergencyUnitId: number): Promise<{
        totalReporters: number;
        reporterChangePercentage: number;
        completedReports: number;
        completedReportsChangePercentage: number;
        activeReports: number;
    }>;
}
