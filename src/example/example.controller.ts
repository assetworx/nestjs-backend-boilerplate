import { Controller, Get } from '@nestjs/common';
import { IAppRootMessage } from 'src/interfaces/approotmessage.interface';
import { ExampleService } from './example.service';
import { IAppStatusMessage } from 'src/interfaces/appstatusmessage.interface';

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
  showAppRoot(): IAppRootMessage {
    return this.exampleService.getAppRootMessage();
  }

  /**
   * @method showAppStatus
   */
  @Get('status')
  showAppStatus(): IAppStatusMessage {
    return this.exampleService.getAppStatus();
  }
}
