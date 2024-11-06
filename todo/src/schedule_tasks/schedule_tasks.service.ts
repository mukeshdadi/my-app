import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleTasks } from './entity/schedule_Tasks.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ScheduleTasksService {
    constructor (
        @InjectRepository(ScheduleTasks)
        private scheduleTaskRepository: Repository<ScheduleTasks>
    ) {}

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
    async filterSchedulesBySpecificDate(date: string): Promise<Schedule_TasksDto[]> {
        
        const formattedDate = this.formatDateToYYYYMMDD(new Date(date));
        
        const [dailyTasks, weeklyTasks, monthlyTasks] = await Promise.all([
            axios.get('http://localhost:3000/daily').then(res => res.data),
            axios.get('http://localhost:3000/weekly').then(res => res.data),
            axios.get('http://localhost:3000/monthly').then(res => res.data),
        ]);
    
        const filteredTasks: any[] = [];
    
        
        for (const task of dailyTasks) {
            const generatedDates = this.generateDailyDates(task.fromDate, task.toDate, task.repeatDays);
            if (generatedDates.includes(formattedDate)) {
                filteredTasks.push({ task_id: task.task_id, title: task.title });
            }
        }
    
        
        for (const task of weeklyTasks) {
            const generatedDates = this.generateWeeklyDates(task.fromDate, task.toDate, task.week, task.repeatDays, task.no_of_months);
            if (generatedDates.includes(formattedDate)) {
                filteredTasks.push({ task_id: task.task_id, title: task.title });
            }
        }
    
        
        for (const task of monthlyTasks) {
            const generatedDates = this.generateMonthlyDates(task.fromDate, task.toDate, task.repeatDays);
            if (generatedDates.includes(formattedDate)) {
                filteredTasks.push({ task_id: task.task_id, title: task.title });
            }
        }
    
        
        const newSchedules = filteredTasks.map(task => {
            const newSchedule = this.scheduleTaskRepository.create({
                
                task_id: task.task_id, 
                title: task.title,    
               
            });
            return newSchedule;
        });
    
        
        await this.scheduleTaskRepository.save(newSchedules);
    
        
        return newSchedules.map(schedule => ({
            id:schedule.id,
            task_id: schedule.task_id,
            title: schedule.title,
          
        }));
    }
}    
