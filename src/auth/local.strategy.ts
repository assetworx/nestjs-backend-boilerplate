import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * ==================== IMPORTANT! ====================
 * Passport-local works only with (username, password) combinations.
 * See: http://www.passportjs.org/docs/username-password/
 * Hence, if you wish to use a different 'local strategy' (e.g. email / magic link based login), you
 * cannot use this Strategy.
 * In that case, use `passport-custom` instead: https://www.npmjs.com/package/passport-custom
 */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  /**
   * Class constructor.
   * @param authService dependency injected authService.
   */
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validate
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
