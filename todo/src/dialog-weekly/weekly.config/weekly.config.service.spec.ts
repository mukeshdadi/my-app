import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyConfigService } from './weekly.config.service';

describe('WeeklyConfigService', () => {
  let service: WeeklyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyConfigService],
    }).compile();

    service = module.get<WeeklyConfigService>(WeeklyConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
