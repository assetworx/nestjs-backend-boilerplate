import { Test, TestingModule } from '@nestjs/testing';
import { ExampleAuthController } from './example-auth.controller';
import { ExampleAuthService } from './example-auth.service';
import { IMessage } from '../interfaces/message.interface';

describe('ExampleAuth Controller', () => {
  let controller: ExampleAuthController;
  let service: ExampleAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleAuthController],
      providers: [ExampleAuthService],
    }).compile();

    controller = module.get<ExampleAuthController>(ExampleAuthController);
    service = module.get<ExampleAuthService>(ExampleAuthService);
  });

  describe('getAuthAcceptedMessage', () => {
    it('should get authentication accepted message', async () => {
      const result: IMessage = {message: 'Successfully requested the authentication-protected route!'};
      expect(await controller.getAuthStatus()).toStrictEqual(result);
    });
  });

  describe('getStrongAuthAcceptedMessage', () => {
    it('should get strong authentication accepted message', async () => {
      const result: IMessage = {message: 'Successfully authenticated and authorized as admin.'};
      expect(await controller.getStrongAuthStatus()).toStrictEqual(result);
    });
  });
});
