import { Controller, Get, Post, Body, Param, Patch, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';



@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
      @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
      return this.todosService.create(createTodoDto);
  }
  

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,

  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Get()
  async findAll() : Promise<Todo[]> {
    return this.todosService.findAll()
  }


  @Get('/filter')
  async getTodos(
    @Query('date') date?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<Todo[]> {
    if (date) {
      return this.todosService.findByDate(date)|| [];
    } else if (fromDate && toDate) {
      return this.todosService.findByDateRange(fromDate, toDate) || [];
    } else {
      return this.todosService.findAll() || [];
    }
  }

  @Get('/byTitle')
  async findByTitle(@Query('title') title: string): Promise<Todo> {
    return this.todosService.findByTitle(title);
  }

  @Get(':id') 
  async findById(@Param('id') id: number): Promise<Todo> {
      return this.todosService.findById(id);
  }
  

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
  //   return this.todosService.update(id, updateTodoDto);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
