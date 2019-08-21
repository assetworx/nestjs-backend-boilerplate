import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExampleAuthService } from './example-auth.service';
import { IMessage } from 'src/interfaces/message.interface';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('example-auth')
export class ExampleAuthController {

  /**
   * Class constructor
   * @param exampleAuthService
   */
  constructor(private readonly exampleAuthService: ExampleAuthService) {}

  /**
   * Route to get authentication status.
   * Requires authentication (i.e., passing a JWT as Authentication Bearer header).
   * Does not require role-based authorization.
   * Thus: this route will be accessible to all users logged in.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('simple')
  getAuthStatus(): IMessage {
    return this.exampleAuthService.getAuthAcceptedMessage();
  }

  /**
   * Rotue to get authentication and authorization (strong auth) status.
   * Requires authentication like above, AND authorization (role-based).
   * This route is only accessible to logged in admin users.
   * Other users will receive HTTP 403 Forbidden.
   */
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Get('strong')
  getStrongAuthStatus(): IMessage {
    return this.exampleAuthService.getStrongAuthAcceptedMessage();
  }

}
