import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Schedule } from './entity/schedule.entity';
import { updateScheduleDto } from './dto/update.schedule.dto';
import { createScheduleDto } from './dto/create.schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllSchedules(): Promise<Schedule[]> {
    return await this.scheduleRepository.find();
  }

  async findByTitle(title: string): Promise<createScheduleDto[]> {
    return this.scheduleRepository.find({ where: { title } });
  }

  async findById(id: number): Promise<createScheduleDto> {
    return this.scheduleRepository.findOne({ where: { id } });
  }

  async createSchedule(
    scheduleData: createScheduleDto,
  ): Promise<createScheduleDto> {
    const todo = this.scheduleRepository.create(scheduleData);
    return this.scheduleRepository.save(scheduleData);
  }

  async update(id: number, updateScheduleDto: updateScheduleDto): Promise<Schedule> {
    const todo = await this.scheduleRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    Object.assign(todo, updateScheduleDto);
    return await this.scheduleRepository.save(todo);
  }

  private formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  generateDailyDates(fromDate: string, toDate: string, repeatDays: string[]): string[] {
    const dates: string[] = [];
    let currentDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (currentDate <= endDate) {
      const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
      if (repeatDays.includes(dayName)) {
        dates.push(this.formatDateToYYYYMMDD(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  generateWeeklyDates(
    fromDate: string,
    toDate: string,
    week: number,
    repeatDays: string[],
    no_of_months: number
  ): string[] {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const generatedDates: string[] = [];

    const dayMap = {
      "Sunday": 0,
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
    };
    const repeatDayNumbers = repeatDays.map(day => dayMap[day]);

    for (let monthOffset = 0; monthOffset < no_of_months; monthOffset++) {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(currentMonth.getMonth() + monthOffset);
      const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const offsetToStartOfWeek = (week - 1) * 7 + (firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0);

      const specifiedWeekStartDate = new Date(currentMonth);
      specifiedWeekStartDate.setDate(1 + offsetToStartOfWeek);

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(specifiedWeekStartDate);
        currentDate.setDate(specifiedWeekStartDate.getDate() + i);
        if (
          repeatDayNumbers.includes(currentDate.getDay()) &&
          currentDate >= startDate &&
          currentDate <= endDate
        ) {
          generatedDates.push(currentDate.toISOString().split('T')[0]);
        }
      }
    }
    return generatedDates;
  }

  generateMonthlyDates(fromDate: string, toDate: string, repeatDays: string[]): string[] {
    const resultDates: string[] = [];
    let currentDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (currentDate <= endDate) {
      const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
      if (repeatDays.includes(dayName)) {
        resultDates.push(this.formatDateToYYYYMMDD(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return resultDates;
  }

  async filterSchedulesByDate(): Promise<void> {
    const todayStr = this.formatDateToYYYYMMDD(new Date());
    const [dailyTasks, weeklyTasks, monthlyTasks] = await Promise.all([
      axios.get('http://localhost:3000/daily').then((res) => res.data),
      axios.get('http://localhost:3000/weekly').then((res) => res.data),
      axios.get('http://localhost:3000/monthly').then((res) => res.data),
    ]);

    const tasksToSchedule: any[] = [];

    for (const task of dailyTasks) {
      const generatedDates = this.generateDailyDates(task.fromDate, task.toDate, task.repeatDays);
      if (generatedDates.includes(todayStr)) {
        for (const time of task.TimeFrequency) {
          tasksToSchedule.push({
            task_id: task.task_id,
            title: task.title,
            lsaHrs: time.LsaHrs,
            lsaTime: time.LsaTime,
          });
        }
      }
    }

    for (const task of weeklyTasks) {
      if (Array.isArray(task.repeatDays)) {
        const generatedDates = this.generateWeeklyDates(task.fromDate, task.toDate, task.week, task.repeatDays, task.no_of_months);
        if (generatedDates.includes(todayStr)) {
          for (const time of task.TimeFrequency) {
            tasksToSchedule.push({
              task_id: task.task_id,
              title: task.title,
              lsaHrs: time.LsaHrs,
              lsaTime: time.LsaTime,
            });
          }
        }
      } else {
        console.error(`Invalid repeatDays for task ID ${task.task_id}:`, task.repeatDays);
      }
    }

    for (const task of monthlyTasks) {
      const generatedDates = this.generateMonthlyDates(task.fromDate, task.toDate, task.repeatDays);
      if (generatedDates.includes(todayStr)) {
        for (const time of task.TimeFrequency) {
          tasksToSchedule.push({
            task_id: task.task_id,
            title: task.title,
            lsaHrs: time.LsaHrs,
            lsaTime: time.LsaTime,
          });
        }
      }
    }

    for (const task of tasksToSchedule) {
      const newSchedule = this.scheduleRepository.create({
        task_id: task.task_id,
        title: task.title,
        date_stamp: todayStr,
        status: 'Open',
        lsaTime: task.lsaTime || '',
        lsaHrs: task.lsaHrs,
      });

      try {
        await this.scheduleRepository.save(newSchedule);
      } catch (error) {
        console.error(`Error saving schedule for task ID: ${task.task_id}`, error);
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('Running cron to filter schedules and delete completed tasks...');
    await this.scheduleRepository.delete({ status: 'Completed' });
    try {
      await this.filterSchedulesByDate();
      console.log('Schedules updated for today.');
    } catch (err) {
      console.error('Error updating schedules:', err);
    }
  }
}
