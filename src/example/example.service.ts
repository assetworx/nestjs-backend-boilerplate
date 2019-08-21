import { Injectable } from '@nestjs/common';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class ExampleService {

  /**
   * Get app root message
   */
  getAppRootMessage(): IMessage {
    return {
      message: 'This is the application root.',
    };
  }

  /**
   * Get example app status
   */
  getAppStatus(): IMessage {
    return {
      message: 'Your example app works.',
    };
  }

}
