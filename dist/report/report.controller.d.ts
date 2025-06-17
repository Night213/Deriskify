import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RetrieveReportDto } from './dto/retrieve-report.dto';
import { EMUAuthenticatedRequest } from '../auth/guards/emu-auth.guard';
import { AuthenticatedRequest } from '../shared/types/auth.types';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto, files: Express.Multer.File[], req: AuthenticatedRequest): Promise<RetrieveReportDto>;
    findAll(): Promise<RetrieveReportDto[]>;
    findMyReports(req: AuthenticatedRequest): Promise<RetrieveReportDto[]>;
    findMyEmergencyUnitReports(req: EMUAuthenticatedRequest): Promise<RetrieveReportDto[]>;
    findOne(id: number): Promise<RetrieveReportDto>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<RetrieveReportDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
