import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entity/todo.entity'
import { DialogDaily } from './dialog-daily/daily.config/entity/daily.config.entity';
import { DailyConfigModule } from './dialog-daily/daily.config/daily.config.module';
import { DialogMonthly } from './dialog-monthly/monthly.config/entity/monthly.config.entity';
import { DialogWeekly } from './dialog-weekly/entity/weekly.config.entity';

import { WeeklyConfigModule } from './dialog-weekly/weekly.config/weekly.config.module';
import { MonthlyConfigModule } from './dialog-monthly/monthly.config/monthly.config.module';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entity/schedule.entity';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksModule } from './schedule_tasks/schedule_tasks.module';
import { ScheduleTasks } from './schedule_tasks/entity/schedule_Tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: '12345',
      database: 'mydb74',
      entities: [ Todo , DialogDaily, DialogMonthly, DialogWeekly, Schedule , ScheduleTasks] ,
      synchronize: false, 
      
    }),
    ScheduleTasksModule,
    TodosModule,
    DailyConfigModule,
    MonthlyConfigModule,
    WeeklyConfigModule,
    ScheduleModule,
    NestScheduleModule.forRoot(),

   

    
  ],
})
export class AppModule {}
