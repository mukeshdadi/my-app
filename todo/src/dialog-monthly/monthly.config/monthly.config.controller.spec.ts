import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyConfigController } from './monthly.config.controller';

describe('MonthlyConfigController', () => {
  let controller: MonthlyConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyConfigController],
    }).compile();

    controller = module.get<MonthlyConfigController>(MonthlyConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
