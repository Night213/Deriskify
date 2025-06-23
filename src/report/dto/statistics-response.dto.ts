import { Expose, Type } from 'class-transformer';

export class DailyReportStats {
  @Expose()
  day: string;

  @Expose()
  count: number;
}

export class StatisticsResponseDto {
  @Expose()
  @Type(() => DailyReportStats)
  weeklyStats: DailyReportStats[];
}
