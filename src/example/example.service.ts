import { Injectable } from '@nestjs/common';
import { IAppStatusMessage } from '../interfaces/appstatusmessage.interface';
import { IAppRootMessage } from 'src/interfaces/approotmessage.interface';

@Injectable()
export class ExampleService {

  /**
   * Get app root message
   */
  getAppRootMessage(): IAppRootMessage {
    return {
      message: 'This is the application root.',
    };
  }

  /**
   * Get example app status
   */
  getAppStatus(): IAppStatusMessage {
    return {
      message: 'Your example app works.',
    };
  }

}
