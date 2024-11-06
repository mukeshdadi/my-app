import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogWeekly } from '../entity/weekly.config.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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
@Injectable()
export class WeeklyConfigService {
    constructor (
        @InjectRepository(DialogWeekly)
        private readonly weeklyRepository : Repository<DialogWeekly>
    ) {}

    async create (createDialogWeekly : Weekly ) : Promise<DialogWeekly> {
        const newWeekly = this.weeklyRepository.create(createDialogWeekly);
        return this.weeklyRepository.save(newWeekly)
    }

    async findAll(): Promise<Weekly[]> {
        const weeklyList = await this.weeklyRepository.find();
    
        return weeklyList;
    }

    async updateByTitle(title: string, updateDialogWeekly: UpdateWeeklyDto): Promise<Weekly> {
        const weekly = await this.weeklyRepository.findOne({ where: { title } });
    
        if (!weekly) {
          throw new NotFoundException(`Weekly with title "${title}" not found`);
        }
    
        Object.assign(weekly, updateDialogWeekly);
    
        return this.weeklyRepository.save(weekly); 
      }

      async updateById(id: number, updateDialogWeekly: UpdateDailyDto): Promise<Weekly> {
        
        const weekly = await this.weeklyRepository.findOne({
          where: {task_id: id } as FindOptionsWhere <Weekly>
        });
      
       
        if (!weekly) {
          throw new NotFoundException(`Weekly with id ${id} not found`);
        }
      
        
        Object.assign(weekly, updateDialogWeekly);
      
        
        return this.weeklyRepository.save(weekly);
      }
      


    async findByTitle(title: string): Promise<Weekly> {
        return this.weeklyRepository.findOne({ where: { title } });
      }

      async removeById(id: number) : Promise<void> {
        await this.weeklyRepository.delete({task_id:id})
    }
    
    async removeByTitle(title: string) : Promise<void> {
      await this.weeklyRepository.delete(title)
    }
}
