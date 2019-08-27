import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { constants } from '../config/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  /**
   * Class constructor.
   * @param authService dependency injected authService.
   */
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.secret,
    });
  }

  /**
   * Validate
   */
  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }

}
