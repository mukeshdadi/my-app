import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { WeeklyConfigService } from './weekly.config.service';
import { DialogWeekly } from '../entity/weekly.config.entity';
import { UpdateDailyDto } from 'src/dialog-daily/daily.config/dto/update.daily.dto';
import { UpdateWeeklyDto } from '../dto/update.weekly.dto';



interface Weekly {
    id:number;
    task_id:number;
    title:string;
    fromDate:string;
    toDate:string;
    repeatDays: string[];
    week: number;
    no_of_months: number;
   
}
@Controller('weekly')
export class WeeklyConfigController {
    constructor (private readonly weeklyConfigService : WeeklyConfigService) {}

    @Post()
    async create(@Body() createDialogWeekly : Weekly ): Promise<DialogWeekly> {
        return this.weeklyConfigService.create(createDialogWeekly)
    }
    @Get()
    async findAll() : Promise<Weekly[]> {
        return this.weeklyConfigService.findAll()
    }

    @Get('/byTitle')
  async findByTitle(@Query('title') title: string): Promise<Weekly> {
    return this.weeklyConfigService.findByTitle(title);
  }

  @Patch('title/:title')
    async updateByTitle(@Param('title') title: string, @Body() updateDialogWeekly: UpdateWeeklyDto): Promise<Weekly> {
      return this.weeklyConfigService.updateByTitle(title, updateDialogWeekly);
    }

    @Patch('id/:id')
    async updateById(@Param('id') id: number , 
    @Body() updateDialogWeekly: UpdateWeeklyDto) : 
    Promise<Weekly> {
        return this.weeklyConfigService.updateById(id , updateDialogWeekly);
    }


 
    @Delete('id/:id')
    async  removeById(@Param('id') id: number ) :Promise<void> {
        return this.weeklyConfigService.removeById(id)
    }

    @Delete('title/:title')
    async  removeByTitle(@Param('title') title: string ) :Promise<void> {
        return this.weeklyConfigService.removeByTitle(title)
    }
}
