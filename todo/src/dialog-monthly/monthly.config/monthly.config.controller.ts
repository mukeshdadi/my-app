import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MonthlyConfigService } from './monthly.config.service';
import { DialogMonthly } from './entity/monthly.config.entity';
import { UpdateMonthlyDto } from './dto/update.monthly.dto';

interface Monthly {
    id:number;
    task_id:number;
    fromDate:string;
    toDate:string;
    title:string;
    repeatDays: string[];

} 
@Controller('monthly')
export class MonthlyConfigController {
    constructor (private readonly monthlyConfigService : MonthlyConfigService) {}

    @Post()
    async create(@Body() createDialogMonthly: Monthly ): Promise<DialogMonthly> {
        return this.monthlyConfigService.create(createDialogMonthly)
    }

    @Patch('title/:title')
    async updateByTitle(@Param('title') title: string, @Body() UpdateDialogMonthly): Promise<Monthly> {
      return this.monthlyConfigService.updateByTitle(title, UpdateDialogMonthly);
    }

    @Patch('id/:id')
    async updateById(@Param('id') id: number , 
    @Body() updateDialogMonthly: UpdateMonthlyDto) : 
    Promise<Monthly> {
        return this.monthlyConfigService.updateById(id , updateDialogMonthly);
    }

    @Get()
    async findAll() : Promise<Monthly[]> {
        return this.monthlyConfigService.findAll()
    }

    @Get('/byTitle')
    async findByTitle(@Query('title') title: string): Promise<Monthly> {
      return this.monthlyConfigService.findByTitle(title);
    }

    @Delete('id/:id')
    async  removeById(@Param('id') id: number ) :Promise<void> {
        return this.monthlyConfigService.removeById(id)
    }

    @Delete('title/:title')
    async  removeByTitle(@Param('title') title: string ) :Promise<void> {
        return this.monthlyConfigService.removeByTitle(title)
    }
}
