import { Test, TestingModule } from '@nestjs/testing';
import { PostgresPoolService } from './postgres-pool.service';
import { AppLoggerService } from '../logger/logger.service';

describe('PostgresPoolService', () => {
  let service: PostgresPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresPoolService,
        AppLoggerService,
      ],
    }).compile();

    service = module.get<PostgresPoolService>(PostgresPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
