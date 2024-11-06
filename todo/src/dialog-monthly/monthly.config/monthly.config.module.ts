import { Module } from '@nestjs/common';
import { MonthlyConfigController } from './monthly.config.controller';
import { MonthlyConfigService } from './monthly.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogMonthly } from './entity/monthly.config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DialogMonthly])],
  controllers: [MonthlyConfigController],
  providers: [MonthlyConfigService]
})
export class MonthlyConfigModule {}
