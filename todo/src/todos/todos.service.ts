import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DialogMonthly } from 'src/dialog-monthly/monthly.config/entity/monthly.config.entity';
import { DialogWeekly } from 'src/dialog-weekly/entity/weekly.config.entity';
import { DialogDaily } from 'src/dialog-daily/daily.config/entity/daily.config.entity';


@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,

    @InjectRepository(DialogDaily)
    private readonly dialogDailyRepository: Repository<DialogDaily>,

    @InjectRepository(DialogMonthly)
    private readonly dialogMonthlyRepository: Repository<DialogMonthly>,

    @InjectRepository(DialogWeekly)
    private readonly dialogWeeklyRepository: Repository<DialogWeekly>,
  ) {}

  async create(
    todoData: CreateTodoDto,
  ): Promise<Todo> {

    if (!todoData) {
      throw new Error('Dialog data must be provided');
    }
   

    const todo = this.todoRepository.create(todoData);
    return  this.todoRepository.save(todo);

  }



  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {

    const todo = await this.todoRepository.findOne({ where: { id } });
    

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    Object.assign(todo, updateTodoDto);


    return await this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
    await this.deleteDialogData(id);
  }

  // private async createDialogData(
  //   taskId: number,
  //   dialogData: CreateDailyDto | CreateMonthlyDto | CreateWeeklyDto,
  //   dateOption: string
  // ) {
  //   switch (dateOption) {
  //     case 'Daily':
  //       const daily = this.dialogDailyRepository.create({ ...dialogData, task_id: taskId });
  //       await this.dialogDailyRepository.save(daily);
  //       break;

  //     case 'By Weekly Days':
  //       const weekly = this.dialogWeeklyRepository.create({ ...dialogData, task_id: taskId });
  //       await this.dialogWeeklyRepository.save(weekly);
  //       break;

  //     case 'Monthly':
  //       const monthly = this.dialogMonthlyRepository.create({ ...dialogData, task_id: taskId });
  //       await this.dialogMonthlyRepository.save(monthly);
  //       break;
  //   }
  // }

  private async deleteDialogData(taskId: number) {
    await this.dialogDailyRepository.delete({ task_id: taskId });
    await this.dialogWeeklyRepository.delete({ task_id: taskId });
    await this.dialogMonthlyRepository.delete({ task_id: taskId });
  }

  async findByTitle(title: string): Promise<Todo> {
    return this.todoRepository.findOne({ where: { title } });
  }

  async findById(id:number) : Promise<Todo> {
    return this.todoRepository.findOne({where :{id} })
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findByDate(date: string): Promise<Todo[]> {
    return this.todoRepository.find({
      where: [
        { fromDate: date },
        { toDate: date }
      ],
    });
  }

  async findByDateRange(fromDate: string, toDate: string): Promise<Todo[]> {
    return this.todoRepository.find({
      where: [
        { fromDate: Between(fromDate, toDate) },
        { toDate: Between(fromDate, toDate) }
      ],
    });
  }
}
