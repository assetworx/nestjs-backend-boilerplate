import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('Login', () => {
    it('should login a user', async () => {
      // const user: any = {
      //   userId: 1,
      //   username: 'example',
      //   password: 'weakpass',
      //   roles: ['normal'],
      // };
      // jest.spyOn(controller, 'login').mockImplementation(() => user);
      // expect(await controller.login(REQ)).toBe(RES);
    });
  });
});
