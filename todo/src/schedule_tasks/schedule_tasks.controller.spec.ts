import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTasksController } from './schedule_tasks.controller';

describe('ScheduleTasksController', () => {
  let controller: ScheduleTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleTasksController],
    }).compile();

    controller = module.get<ScheduleTasksController>(ScheduleTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
