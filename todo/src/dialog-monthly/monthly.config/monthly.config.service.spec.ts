import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyConfigService } from './monthly.config.service';

describe('MonthlyConfigService', () => {
  let service: MonthlyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyConfigService],
    }).compile();

    service = module.get<MonthlyConfigService>(MonthlyConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
