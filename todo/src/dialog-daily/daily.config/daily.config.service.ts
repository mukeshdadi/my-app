import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogDaily } from './entity/daily.config.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateDailyDto } from './dto/create.daily.dto';
import { UpdateDailyDto } from './dto/update.daily.dto';


interface Daily {
  id:number;
    task_id:number;
    fromDate:string;
    toDate:string;
    option:string
    title:string;
    repeatDays: string[];
    
   
}

@Injectable()
export class DailyConfigService {
    constructor(
        @InjectRepository(DialogDaily)
        private readonly DailyRepository: Repository<DialogDaily>
    ) {}

    async create (createDialogDaily: CreateDailyDto): Promise<Daily>{
        
        const newDaily = this.DailyRepository.create(createDialogDaily);
        return this.DailyRepository.save(newDaily)
    }

    async updateByTitle(title: string, updateDialogDaily: UpdateDailyDto): Promise<Daily> {
        const daily = await this.DailyRepository.findOne({ where: { title } });
    
        if (!daily) {
          throw new NotFoundException(`Daily with title "${title}" not found`);
        }
    
        Object.assign(daily, updateDialogDaily); 
    
        return this.DailyRepository.save(daily); 
      }

      async updateById(id: number, updateDialogDaily: UpdateDailyDto): Promise<Daily> {
        
        const daily = await this.DailyRepository.findOne({
          where: {task_id: id } as FindOptionsWhere <Daily>
        });
      
       
        if (!daily) {
          throw new NotFoundException(`Daily with id ${id} not found`);
        }
      
        
        Object.assign(daily, updateDialogDaily);
      
        
        return this.DailyRepository.save(daily);
      }
      

    async findByTitle(title: string): Promise<Daily[]> {
        return this.DailyRepository.find({ where: { title } });
    }

    
    async findById(id: number): Promise<Daily> {
        return this.DailyRepository.findOne({ where: { task_id: id } });
    }
    
    async findAll(): Promise<Daily[]> {
        const dailyList = await this.DailyRepository.find();
    
    return dailyList;
      }

      async removeById(id: number) : Promise<void> {
        await this.DailyRepository.delete( { task_id: id } )
    }
    
    async removeByTitle(title: string) : Promise<void> {
      await this.DailyRepository.delete({title})
    }

}
