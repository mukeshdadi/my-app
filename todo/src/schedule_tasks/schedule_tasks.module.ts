import { Module } from '@nestjs/common';
import { ScheduleTasksController } from './schedule_tasks.controller';
import { ScheduleTasksService } from './schedule_tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleTasks } from './entity/schedule_Tasks.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ScheduleTasks])
  ],
  controllers: [ScheduleTasksController],
  providers: [ScheduleTasksService]
})
export class ScheduleTasksModule {}
