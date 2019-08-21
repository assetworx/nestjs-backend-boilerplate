import { Test, TestingModule } from '@nestjs/testing';
import { ExampleAuthController } from './example-auth.controller';

describe('ExampleAuth Controller', () => {
  let controller: ExampleAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleAuthController],
    }).compile();

    controller = module.get<ExampleAuthController>(ExampleAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
