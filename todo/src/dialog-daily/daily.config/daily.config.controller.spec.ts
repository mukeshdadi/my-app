import { Test, TestingModule } from '@nestjs/testing';
import { DailyConfigController } from './daily.config.controller';

describe('DailyConfigController', () => {
  let controller: DailyConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyConfigController],
    }).compile();

    controller = module.get<DailyConfigController>(DailyConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
