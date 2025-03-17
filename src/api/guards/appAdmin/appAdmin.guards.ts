import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

  
@Injectable()
export class AppAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,

  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token.substring(7, token.length),
        {
          secret: this.configService.get('APP_ADMIN_SECRET'),
        }
      );
      request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    return true;
    }
  
  }
