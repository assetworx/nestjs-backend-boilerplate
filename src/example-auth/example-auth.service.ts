import { Injectable } from '@nestjs/common';
import { IMessage } from 'src/interfaces/message.interface';

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

}
