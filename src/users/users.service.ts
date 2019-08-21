import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

  /**
   * Instance variables
   */
  private readonly users: IUser[];

  /**
   * Class constructor
   */
  constructor() {
    // Initialize one user
    this.users = [
      {
        userId: 1,
        username: 'example',
        password: 'weakpass',
      },
    ];
  }

  /**
   * Check if a user exists.
   * @param username
   * @return userExists
   */
  findUser(username: string) {
    return this.users.find(user => user.username === username);
  }

}
