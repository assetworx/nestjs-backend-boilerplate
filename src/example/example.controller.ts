import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { IMessage } from 'src/interfaces/message.interface';

@Controller('')
export class ExampleController {

  /**
   * Class constructor.
   * @param exampleService dependency injected exampleService
   */
  constructor(private exampleService: ExampleService) {
    this.exampleService = exampleService;
  }

  /**
   * @method showAppRoot
   * Generate response for the application root route.
   */
  @Get()
  showAppRoot(): IMessage {
    return this.exampleService.getAppRootMessage();
  }

  /**
   * @method showAppStatus
   */
  @Get('status')
  showAppStatus(): IMessage {
    return this.exampleService.getAppStatus();
  }
}
