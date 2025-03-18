import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SuperAdminJwtStrategy extends PassportStrategy(
  Strategy,
  'superAdmin-strategy',
) {
  constructor(private readonly configService: ConfigService) {
    const SECRET_KEY = configService.get('SUPER_ADMIN_SECRET');
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
