import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { S3Service } from '../lib/services/s3.service';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';
import { ReportStatus } from 'src/shared/enums/report.enums';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(EmergencyUnit)
    private emergencyUnitRepository: Repository<EmergencyUnit>,
    private s3Service: S3Service,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    files: Express.Multer.File[],
    userId: number,
  ): Promise<Report> {
    // Find emergency unit by UUID
    const emergencyUnit = await this.emergencyUnitRepository.findOne({
      where: { _id: createReportDto.emergencyUnitId as UUID },
    });

    if (!emergencyUnit) {
      throw new NotFoundException(
        `Emergency Unit with UUID ${createReportDto.emergencyUnitId} not found`,
      );
    }

    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = await this.s3Service.uploadMultipleFiles(files, 'reports');
    }

    const reportData = {
      description: createReportDto.description,
      images: imageUrls,
      user: { id: userId },
      emergencyUnit: { id: emergencyUnit.id },
      coordinates: {
        type: 'Point' as const,
        coordinates: createReportDto.coordinates,
      },
    };

    const report = this.reportRepository.create(reportData);
    const savedReport = await this.reportRepository.save(report);
    return savedReport;
  }

  async findAll(): Promise<Report[]> {
    const reports = await this.reportRepository.find({
      relations: ['user', 'emergencyUnit'],
    });
    return reports;
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user', 'emergencyUnit'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async findByUuid(_id: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { _id: _id as UUID },
      relations: ['user', 'emergencyUnit'],
    });

    if (!report) {
      throw new NotFoundException(`Report with UUID ${_id} not found`);
    }

    return report;
  }

  async findByUser(userId: number): Promise<Report[]> {
    const reports = await this.reportRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'emergencyUnit'],
    });

    return reports;
  }

  async findByEmergencyUnit(
    emergencyUnitId: number,
    status: ReportStatus,
  ): Promise<Report[]> {
    const reports = await this.reportRepository.find({
      where: { emergencyUnit: { id: emergencyUnitId }, status },
      relations: ['user', 'emergencyUnit'],
    });

    return reports;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    // Get the raw report without transformation
    const rawReport = await this.reportRepository.findOne({
      where: { id },
      relations: ['user', 'emergencyUnit'],
    });

    if (!rawReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    Object.assign(rawReport, updateReportDto);
    const updatedReport = await this.reportRepository.save(rawReport);

    return updatedReport;
  }

  async remove(id: UUID): Promise<void> {
    const report = await this.findByUuid(id);

    // Delete images from S3 if they exist
    if (report.images && report.images.length > 0) {
      for (const imageUrl of report.images) {
        try {
          await this.s3Service.deleteFile(imageUrl);
        } catch (error) {
          console.error(`Failed to delete image ${imageUrl}:`, error);
        }
      }
    }

    await this.reportRepository.remove(report);
  }

  async getSignedUploadUrls(
    fileNames: string[],
    contentTypes: string[],
  ): Promise<string[]> {
    if (fileNames.length !== contentTypes.length) {
      throw new Error(
        'File names and content types arrays must have the same length',
      );
    }

    const signedUrls: string[] = [];
    for (let i = 0; i < fileNames.length; i++) {
      const signedUrl = await this.s3Service.getSignedUploadUrl(
        fileNames[i],
        contentTypes[i],
        'reports',
      );
      signedUrls.push(signedUrl);
    }

    return signedUrls;
  }

  async acceptReport(id: UUID): Promise<Report> {
    try {
      const report = await this.reportRepository.findOne({
        where: { _id: id },
        relations: ['user', 'emergencyUnit'],
      });
      if (!report) {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }
      if (report.status !== ReportStatus.ACTIVE) {
        throw new BadRequestException(
          `Report with ID ${id} is not in an active state`,
        );
      }
      report.status = ReportStatus.ACCEPTED;
      const updatedReport = await this.reportRepository.save(report);
      return updatedReport;
    } catch (error) {
      console.error(`Error accepting report with ID ${id}:`, error);
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
  }

  async getWeeklyReportStats(
    emergencyUnitId?: number,
  ): Promise<{ day: string; count: number }[]> {
    try {
      // Instead of using SQL directly, we'll get all reports and do the grouping in JavaScript
      const query = this.reportRepository
        .createQueryBuilder('report')
        .select('report.createdAt')
        .addSelect('report.id');

      // Filter by emergency unit if provided
      if (emergencyUnitId) {
        query.leftJoin('report.emergencyUnit', 'emergencyUnit');
        query.where('emergencyUnit.id = :emergencyUnitId', {
          emergencyUnitId,
        });
      }

      const reports = await query.getMany();

      // Group reports by day of week
      const dayMap: Record<number, string> = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
      };

      // Count reports for each day of the week
      const dayCounts: Record<string, number> = {
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

      // Convert to array format
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const formattedResults = daysOfWeek.map((day) => ({
        day,
        count: dayCounts[day],
      }));

      return formattedResults;
    } catch (error) {
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

  async getEmergencyUnitStats(emergencyUnitId: number): Promise<{
    totalReporters: number;
    reporterChangePercentage: number;
    completedReports: number;
    completedReportsChangePercentage: number;
    activeReports: number;
  }> {
    try {
      // Get current date and first day of current month
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Query for total unique reporters (users)
      const totalReportersQuery = this.reportRepository
        .createQueryBuilder('report')
        .leftJoin('report.user', 'user')
        .leftJoin('report.emergencyUnit', 'emergencyUnit')
        .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
        .select('COUNT(DISTINCT user.id)', 'count');

      const totalReportersRaw = (await totalReportersQuery.getRawOne()) as {
        count?: string;
      };
      const totalReporters = parseInt(totalReportersRaw?.count ?? '0', 10);

      // Query for users who reported this month
      const newReportersQuery = this.reportRepository
        .createQueryBuilder('report')
        .leftJoin('report.user', 'user')
        .leftJoin('report.emergencyUnit', 'emergencyUnit')
        .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
        .andWhere('report.createdAt >= :firstDayOfMonth', { firstDayOfMonth })
        .select('COUNT(DISTINCT user.id)', 'count');

      const newReportersRaw = (await newReportersQuery.getRawOne()) as {
        count?: string;
      };
      const newReporters = parseInt(newReportersRaw?.count ?? '0', 10);

      // Calculate reporter change percentage
      const reporterChangePercentage =
        totalReporters > 0
          ? Math.round((newReporters / totalReporters) * 100)
          : 0;

      // Query for completed reports
      const completedReportsQuery = this.reportRepository
        .createQueryBuilder('report')
        .leftJoin('report.emergencyUnit', 'emergencyUnit')
        .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
        .andWhere('report.status = :status', { status: ReportStatus.ACCEPTED })
        .select('COUNT(report.id)', 'count');

      const completedReportsRaw = (await completedReportsQuery.getRawOne()) as {
        count?: string;
      };
      const completedReports = parseInt(completedReportsRaw?.count ?? '0', 10);

      // Query for completed reports this month
      const newCompletedReportsQuery = this.reportRepository
        .createQueryBuilder('report')
        .leftJoin('report.emergencyUnit', 'emergencyUnit')
        .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
        .andWhere('report.status = :status', { status: ReportStatus.ACCEPTED })
        .andWhere('report.updatedAt >= :firstDayOfMonth', { firstDayOfMonth })
        .select('COUNT(report.id)', 'count');

      const newCompletedReportsRaw =
        (await newCompletedReportsQuery.getRawOne()) as { count?: string };
      const newCompletedReports = parseInt(
        newCompletedReportsRaw?.count ?? '0',
        10,
      );

      // Calculate completed reports change percentage
      // For decrease, this will be negative
      const completedReportsChangePercentage =
        completedReports > 0
          ? Math.round((newCompletedReports / completedReports) * 100) * -1 // Negative for decrease
          : 0;

      // Query for active reports
      const activeReportsQuery = this.reportRepository
        .createQueryBuilder('report')
        .leftJoin('report.emergencyUnit', 'emergencyUnit')
        .where('emergencyUnit.id = :emergencyUnitId', { emergencyUnitId })
        .andWhere('report.status = :status', { status: ReportStatus.ACTIVE })
        .select('COUNT(report.id)', 'count');

      const activeReportsRaw = (await activeReportsQuery.getRawOne()) as {
        count?: string;
      };
      const activeReports = parseInt(activeReportsRaw?.count ?? '0', 10);

      return {
        totalReporters,
        reporterChangePercentage,
        completedReports,
        completedReportsChangePercentage,
        activeReports,
      };
    } catch (error) {
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
}
