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
  ): Promise<RetrieveReportDto[]> {
    const reports = await this.reportService.findByEmergencyUnit(req.emu.id);
    console.log(
      plainToInstance(RetrieveReportDto, reports, {
        excludeExtraneousValues: true,
      }),
    );
    return plainToInstance(RetrieveReportDto, reports, {
      excludeExtraneousValues: true,
    });
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RetrieveReportDto> {
    const report = await this.reportService.findOne(id);
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
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.reportService.remove(id);
    return { message: 'Report deleted successfully' };
  }
}
