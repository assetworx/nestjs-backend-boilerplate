import { Test, TestingModule } from '@nestjs/testing';
import { ExampleAuthService } from './example-auth.service';

describe('ExampleAuthService', () => {
  let service: ExampleAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleAuthService],
    }).compile();

    service = module.get<ExampleAuthService>(ExampleAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
