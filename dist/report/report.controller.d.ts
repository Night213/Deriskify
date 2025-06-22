import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RetrieveReportDto } from './dto/retrieve-report.dto';
import { EMUAuthenticatedRequest } from '../auth/guards/emu-auth.guard';
import { AuthenticatedRequest } from '../shared/types/auth.types';
import { UUID } from 'crypto';
import { EmergencyUnitStatsDto } from './dto/emergency-unit-stats.dto';
import { StatisticsResponseDto } from './dto/statistics-response.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto, files: Express.Multer.File[], req: AuthenticatedRequest): Promise<RetrieveReportDto>;
    findAll(): Promise<RetrieveReportDto[]>;
    findMyReports(req: AuthenticatedRequest): Promise<RetrieveReportDto[]>;
    findMyEmergencyUnitReports(req: EMUAuthenticatedRequest, status?: string): Promise<{
        reports: RetrieveReportDto[];
        stats: EmergencyUnitStatsDto;
    }>;
    findEmergencyUnitReportById(id: UUID): Promise<RetrieveReportDto>;
    findOne(id: UUID): Promise<RetrieveReportDto>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<RetrieveReportDto>;
    remove(id: UUID): Promise<{
        message: string;
    }>;
    acceptReport(id: UUID): Promise<RetrieveReportDto>;
    getStatistics(req: EMUAuthenticatedRequest): Promise<StatisticsResponseDto>;
}
