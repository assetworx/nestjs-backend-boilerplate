import { Test, TestingModule } from '@nestjs/testing';
import { PostgresPoolService } from './postgres-pool.service';

describe('PostgresPoolService', () => {
  let service: PostgresPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresPoolService],
    }).compile();

    service = module.get<PostgresPoolService>(PostgresPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
