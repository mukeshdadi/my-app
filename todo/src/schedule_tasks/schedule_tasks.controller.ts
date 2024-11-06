
import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleTasksService } from './schedule_tasks.service';
import { ScheduleTasks } from './entity/schedule_Tasks.entity';

@Controller('scheduleTasks')
export class ScheduleTasksController {
    constructor(private readonly scheduleTasksService: ScheduleTasksService) {}

    @Get('/tasks')
    async getTasksByDate(@Query('date') date: string): Promise<ScheduleTasks[]> {
        return this.scheduleTasksService.filterSchedulesBySpecificDate(date);
    }
}
