import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { S3Service } from '../lib/services/s3.service';
import { EmergencyUnit } from '../emergency-unit/entities/emergency-unit.entity';

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

  async findByEmergencyUnit(emergencyUnitId: number): Promise<Report[]> {
    const reports = await this.reportRepository.find({
      where: { emergencyUnit: { id: emergencyUnitId } },
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

  async remove(id: number): Promise<void> {
    const report = await this.findOne(id);

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
}
