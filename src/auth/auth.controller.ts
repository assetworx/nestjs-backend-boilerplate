import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  /**
   * Class constructor.
   * @param authService dependency injected authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Login route.
   * @param req
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.sign(req.user);
  }

}
