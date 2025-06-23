import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from '../configs/db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const synchronize: boolean =
          configService.get<string>('DB_SYNC', 'false') === 'true';
        return {
          ...dataSourceOptions,
          autoLoadEntities: true,
          synchronize,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
