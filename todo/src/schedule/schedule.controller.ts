import { Controller, Get, Patch, Param, Body, Delete, HttpCode, HttpStatus, Post, Query, BadRequestException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { createScheduleDto } from './dto/create.schedule.dto';
import { updateScheduleDto } from './dto/update.schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}


  @Get()
  async getAllSchedules(): Promise<createScheduleDto[]> {
    return await this.scheduleService.getAllSchedules();
  }

  @Get('/byTitle')
  async findByTitle(@Query('title') title: string): Promise<createScheduleDto[]> {
    return this.scheduleService.findByTitle(title);
  
  }

  @Get(':id') 
  async findById(@Param('id') id: number): Promise<createScheduleDto> {
      return this.scheduleService.findById(id);
  }




  @Post('create')
  async createSchedule(
    @Body() createScheduleDto:createScheduleDto,
  ): Promise <createScheduleDto> {
    return this.scheduleService.createSchedule(createScheduleDto)
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateScheduleDto: updateScheduleDto,
  ): Promise<createScheduleDto> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  // // Delete an existing schedule
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.scheduleService.remove(id);
  // }
}
