import { Expose } from 'class-transformer';

export class EmergencyUnitStatsDto {
  @Expose()
  totalReporters: number;

  @Expose()
  reporterChangePercentage: number;

  @Expose()
  completedReports: number;

  @Expose()
  completedReportsChangePercentage: number;

  @Expose()
  activeReports: number;
}
