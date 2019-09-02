import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('FindUser', () => {
    it('should find a user', async () => {
      const user: any = {
        userId: 1,
        username: 'example',
        password: 'weakpass',
        roles: ['normal'],
      };
      expect(await service.findUser('example')).toStrictEqual(user);
    });
  });
});
