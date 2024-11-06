import { Test, TestingModule } from '@nestjs/testing';
import { DailyConfigService } from './daily.config.service';

describe('DailyConfigService', () => {
  let service: DailyConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyConfigService],
    }).compile();

    service = module.get<DailyConfigService>(DailyConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
