
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity'; 
import { DialogDaily } from 'src/dialog-daily/daily.config/entity/daily.config.entity';
import { DialogWeekly } from 'src/dialog-weekly/entity/weekly.config.entity';
import { DialogMonthly } from 'src/dialog-monthly/monthly.config/entity/monthly.config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,DialogDaily,DialogMonthly,DialogWeekly])], 
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
