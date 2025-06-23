import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RetrieveReportDto } from './dto/retrieve-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  EMUAuthGuard,
  EMUAuthenticatedRequest,
} from '../auth/guards/emu-auth.guard';
import { AuthenticatedRequest } from '../shared/types/auth.types';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import { ReportStatus } from 'src/shared/enums/report.enums';
import { EmergencyUnitStatsDto } from './dto/emergency-unit-stats.dto';
import { StatisticsResponseDto } from './dto/statistics-response.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: AuthenticatedRequest,
  ): Promise<RetrieveReportDto> {
    if (!files || files.length === 0) {
      throw new Error('At least one image is required');
    }
    const createdReport = await this.reportService.create(
      createReportDto,
      files,
      req.user.id,
    );
    return plainToInstance(RetrieveReportDto, createdReport, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<RetrieveReportDto[]> {
    const reports = await this.reportService.findAll();
    return plainToInstance(RetrieveReportDto, reports, {
      excludeExtraneousValues: true,
    });
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findMyReports(
    @Req() req: AuthenticatedRequest,
  ): Promise<RetrieveReportDto[]> {
    const reports = await this.reportService.findByUser(req.user.id);
    return plainToInstance(RetrieveReportDto, reports, {
      excludeExtraneousValues: true,
    });
  }

  @Get('emergency-unit')
  @UseGuards(EMUAuthGuard)
  async findMyEmergencyUnitReports(
    @Req() req: EMUAuthenticatedRequest,
    @Query('status') status: string = ReportStatus.ACTIVE,
  ): Promise<{
    reports: RetrieveReportDto[];
    stats: EmergencyUnitStatsDto;
  }> {
    if (!Object.values(ReportStatus).includes(status as ReportStatus)) {
      throw new Error('Invalid report status');
    }

    const emergencyUnitId = req.emu.id;

    // Get reports
    const reports = await this.reportService.findByEmergencyUnit(
      emergencyUnitId,
      status as ReportStatus,
    );
    // Get statistics
    const stats =
      await this.reportService.getEmergencyUnitStats(emergencyUnitId);

    // Format the response
    return {
      reports: plainToInstance(RetrieveReportDto, reports, {
        excludeExtraneousValues: true,
      }),
      stats: plainToInstance(EmergencyUnitStatsDto, stats, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('emergency-unit/:id')
  @UseGuards(EMUAuthGuard)
  async findEmergencyUnitReportById(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<RetrieveReportDto> {
    const report = await this.reportService.findByUuid(id);
    return plainToInstance(RetrieveReportDto, report, {
      excludeExtraneousValues: true,
    });
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<RetrieveReportDto> {
    const report = await this.reportService.findByUuid(id);
    return plainToInstance(RetrieveReportDto, report, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('user/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<RetrieveReportDto> {
    const updatedReport = await this.reportService.update(id, updateReportDto);
    return plainToInstance(RetrieveReportDto, updatedReport, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('user/:id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<{ message: string }> {
    await this.reportService.remove(id);
    return { message: 'Report deleted successfully' };
  }

  @Patch(':id/accept')
  @UseGuards(EMUAuthGuard)
  async acceptReport(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<RetrieveReportDto> {
    const acceptedReport = await this.reportService.acceptReport(id);
    return plainToInstance(RetrieveReportDto, acceptedReport, {
      excludeExtraneousValues: true,
    });
  }

  @Get('statistics')
  @UseGuards(EMUAuthGuard)
  async getStatistics(
    @Req() req: EMUAuthenticatedRequest,
  ): Promise<StatisticsResponseDto> {
    const emergencyUnitId = req.emu.id;

    // Get reports by day of week
    const weeklyStats =
      await this.reportService.getWeeklyReportStats(emergencyUnitId);

    return plainToInstance(
      StatisticsResponseDto,
      { weeklyStats },
      { excludeExtraneousValues: true },
    );
  }
}
