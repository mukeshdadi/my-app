import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DialogMonthly } from './entity/monthly.config.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateMonthlyDto } from './dto/update.monthly.dto';
import { UpdateDailyDto } from 'src/dialog-daily/daily.config/dto/update.daily.dto';


interface Monthly {
    id:number;
    task_id:number;
    fromDate:string;
    toDate:string;
    title:string;
    repeatDays: string[];
    
}
@Injectable()
export class MonthlyConfigService {
    constructor ( @InjectRepository(DialogMonthly)
    private readonly MonthlyRepository: Repository<DialogMonthly>

){}

async create (createDialogMonthly: Monthly): Promise<DialogMonthly>{
    const newMonthy = this.MonthlyRepository.create(createDialogMonthly);
    return this.MonthlyRepository.save(newMonthy)
}

async updateByTitle(title: string, updateDialogMonthly: UpdateMonthlyDto): Promise<Monthly> {
    const monthly = await this.MonthlyRepository.findOne({ where: { title } });

    if (!monthly) {
      throw new NotFoundException(`Monthly with title "${title}" not found`);
    }

    Object.assign(monthly, updateDialogMonthly); 

    return this.MonthlyRepository.save(monthly);
  }

  async updateById(id: number, updateDialogMonthly: UpdateMonthlyDto): Promise<Monthly> {
   
    const monthly = await this.MonthlyRepository.findOne({
      where: { task_id: id } as FindOptionsWhere <Monthly>
    });
  
    
    if (!monthly) {
      throw new NotFoundException(`Monthly with id ${id} not found`);
    }
  
    
    Object.assign(monthly, updateDialogMonthly);
  
   
    return this.MonthlyRepository.save(monthly);
  }

async findAll() : Promise<Monthly[]> {
    const monthlyList = await this.MonthlyRepository.find()
    return monthlyList
}

async findByTitle(title: string): Promise<Monthly> {
    return this.MonthlyRepository.findOne({ where: { title } });
  }

async removeById(id: number) : Promise<void> {
    await this.MonthlyRepository.delete({task_id:id})
}

async removeByTitle(title: string) : Promise<void> {
  await this.MonthlyRepository.delete(title)
}
}
