import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DailyConfigService } from './daily.config.service';
import { DialogDaily } from './entity/daily.config.entity';
import { CreateDailyDto } from './dto/create.daily.dto';
import { UpdateDailyDto } from './dto/update.daily.dto';
import { title } from 'node:process';

interface Daily {
    id:number;
    task_id:number;
    title:string;
    fromDate:string;
    toDate:string;
    option:string
    repeatDays: string[];

 
}

@Controller('daily')
export class DailyConfigController {
    constructor (private readonly dailyConfigService: DailyConfigService) {}

    @Post()
    async create(@Body() createDialogDaily: CreateDailyDto ): Promise<Daily> {
        return this.dailyConfigService.create(createDialogDaily)
    }
    @Patch('title/:title')
    async updateByTitle(@Param('title') title: string, @Body() updateDialogDaily: UpdateDailyDto): Promise<Daily> {
      return this.dailyConfigService.updateByTitle(title, updateDialogDaily);
    }

    @Patch('id/:id')
    async updateById(@Param('id') id: number , 
    @Body() updateDialogDaily: UpdateDailyDto) : 
    Promise<Daily> {
        return this.dailyConfigService.updateById(id , updateDialogDaily);
    }

    @Get()
    async findAll() : Promise<Daily[]> {
        return this.dailyConfigService.findAll()

    }

    @Get('byTitle')
    async findByTitle(@Query('title') title: string): Promise<Daily[]> {
        return this.dailyConfigService.findByTitle(title);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Daily> {
        return this.dailyConfigService.findById(id);
    }

    @Delete('id/:id')
    async  removeById(@Param('id') id: number ) :Promise<void> {
        return this.dailyConfigService.removeById(id)
    }

    @Delete('title/:title')
    async  removeByTitle(@Param('title') title: string ) :Promise<void> {
        return this.dailyConfigService.removeByTitle(title)
    }
}
