import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';
import { IMessage } from '../interfaces/message.interface';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  describe('showAppRoot', () => {
    it('should generate response for the application root route', async () => {
      const result: IMessage = {message: 'This is the application root.'};
      expect(await service.getAppRootMessage()).toStrictEqual(result);
    });
  });

  describe('showAppStatus', () => {
    it('should get example app status', async () => {
      const result: IMessage = {message: 'Your example app works.'};
      expect(await service.getAppStatus()).toStrictEqual(result);
    });
  });
});
