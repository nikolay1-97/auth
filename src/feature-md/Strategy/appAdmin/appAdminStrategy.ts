import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AppAdminJwtStrategy extends PassportStrategy(
  Strategy,
  'appAdmin-strategy',
) {
  constructor(private readonly configService: ConfigService) {
    const SECRET_KEY = configService.get('APP_ADMIN_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
