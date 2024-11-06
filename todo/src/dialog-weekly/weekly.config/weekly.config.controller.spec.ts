import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyConfigController } from './weekly.config.controller';

describe('WeeklyConfigController', () => {
  let controller: WeeklyConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyConfigController],
    }).compile();

    controller = module.get<WeeklyConfigController>(WeeklyConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
