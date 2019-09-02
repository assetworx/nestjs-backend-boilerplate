import { Test, TestingModule } from '@nestjs/testing';
import { ExampleAuthService } from './example-auth.service';
import { IMessage } from '../interfaces/message.interface';

describe('ExampleAuthService', () => {
  let service: ExampleAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleAuthService],
    }).compile();

    service = module.get<ExampleAuthService>(ExampleAuthService);
  });

  describe('getAuthAcceptedMessage', () => {
    it('should get authentication accepted message', async () => {
      const result: IMessage = {message: 'Successfully requested the authentication-protected route!'};
      expect(await service.getAuthAcceptedMessage()).toStrictEqual(result);
    });
  });

  describe('getStrongAuthAcceptedMessage', () => {
    it('Get strong authentication accepted message', async () => {
      const result: IMessage = {message: 'Successfully authenticated and authorized as admin.'};
      expect(await service.getStrongAuthAcceptedMessage()).toStrictEqual(result);
    });
  });
});
