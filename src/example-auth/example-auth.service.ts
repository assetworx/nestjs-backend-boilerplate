import { Injectable } from '@nestjs/common';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class ExampleAuthService {

  /**
   * Get authentication accepted message.
   */
  getAuthAcceptedMessage(): IMessage {
    return {
      message: 'Successfully requested the authentication-protected route!',
    };
  }

  /**
   * Get strong authentication accepted message.
   */
  getStrongAuthAcceptedMessage(): IMessage {
    return {
      message: 'Successfully authenticated and authorized as admin.',
    }
  };

}
