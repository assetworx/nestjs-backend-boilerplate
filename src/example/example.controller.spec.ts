import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { IMessage } from '../interfaces/message.interface';

describe('ExampleController', () => {
  let controller: ExampleController;
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
    service = module.get<ExampleService>(ExampleService);
  });

  describe('showAppRoot', () => {
    it('should generate response for the application root route', async () => {
      const result: IMessage = {message: 'This is the application root.'};
      expect(await controller.showAppRoot()).toStrictEqual(result);
    });
  });

  describe('showAppStatus', () => {
    it('should get example app status', async () => {
      const result: IMessage = {message: 'Your example app works.'};
      expect(await controller.showAppStatus()).toStrictEqual(result);
    });
  });

  // TODO: Add testing case for Generic Example Error

  // describe('showGenericExampleError', () => {
  //   it('should show generic example error', async () => {
  //     const result: IMessage = {message: 'Your example app works.'};
  //     expect(await controller.showGenericExampleError()).toThrow(GenericException);
  //   });
  // });
});
