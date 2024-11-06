import { Module } from '@nestjs/common';
import { DailyConfigController } from './daily.config.controller';
import { DailyConfigService } from './daily.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogDaily } from './entity/daily.config.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DialogDaily])],
  controllers: [DailyConfigController],
  providers: [DailyConfigService],
  
})
export class DailyConfigModule {}
