import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../config/constants';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: constants.secret,
          signOptions: { expiresIn: constants.jwtDefaultExpiration },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('ValidateUser', () => {
    it('should validate a user', async () => {
      // const user: any = {
      //   userId: 1,
      //   username: 'example',
      //   password: 'weakpass',
      //   roles: ['normal'],
      // };
      // jest.spyOn(service, 'validateUser').mockImplementation(() => user);
      // expect(await service.validateUser('example', 'weakpass')).toBe(user);
    });
  });

  describe('SignUser', () => {
    it('should sign a JWT for a user', async () => {
      // const user: any = {
      //   userId: 1,
      //   username: 'example',
      //   password: 'weakpass',
      //   roles: ['normal'],
      // };
      // jest.spyOn(service, 'validateUser').mockImplementation(() => user);

      // expect(await service.sign(user)).toBe(expect.anything());
    });
  });
});
