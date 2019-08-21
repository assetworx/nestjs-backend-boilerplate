import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { IMessage } from 'src/interfaces/message.interface';
import { GenericException } from 'src/exceptions/generic.exception';

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

  /**
   * @method showGenericExampleError
   */
  @Get('error')
  showGenericExampleError(): void {
    throw new GenericException('This is an example of how to define custom exceptions in your backend.');
  }

}
