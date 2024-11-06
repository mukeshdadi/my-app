import { Module } from '@nestjs/common';
import { WeeklyConfigController } from './weekly.config.controller';
import { WeeklyConfigService } from './weekly.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogWeekly } from '../entity/weekly.config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DialogWeekly])],
  controllers: [WeeklyConfigController],
  providers: [WeeklyConfigService]
})
export class WeeklyConfigModule {}
