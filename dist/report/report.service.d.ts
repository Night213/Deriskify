import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { S3Service } from '../lib/services/s3.service';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';
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
    findByEmergencyUnit(emergencyUnitId: number): Promise<Report[]>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<Report>;
    remove(id: number): Promise<void>;
    getSignedUploadUrls(fileNames: string[], contentTypes: string[]): Promise<string[]>;
}
