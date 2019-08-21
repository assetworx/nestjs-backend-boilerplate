import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExampleAuthService } from './example-auth.service';
import { IMessage } from 'src/interfaces/message.interface';

@Controller('example-auth')
export class ExampleAuthController {

  /**
   * Class constructor
   * @param exampleAuthService
   */
  constructor(private readonly exampleAuthService: ExampleAuthService) {}

  /**
   * Route to get authentication status.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  getAuthStatus(): IMessage {
    return this.exampleAuthService.getAuthAcceptedMessage();
  }

}
