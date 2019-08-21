import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/user.interface';
import { IJwt } from 'src/interfaces/jwt.interface';

@Injectable()
export class AuthService {

  /**
   * Class constructor
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate a user.
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    // Note that normally, you would use password hashing here.
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  /**
   * Sign a JWT for a user.
   * @param user user
   */
  async sign(user: IUser): Promise<IJwt> {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
