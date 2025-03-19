import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppRepository } from 'src/db/repositories/app/repository';
import { UserRepository } from 'src/db/repositories/user/repository';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly appRepository: AppRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request['body'];
    if (!body) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token.substring(7, token.length));

    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.getById(parseInt(payload.sub));
    if (!user) {
      throw new UnauthorizedException();
    }
    const app = await this.appRepository.getBySecret(body['appSecret']);
    if (!app) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token.substring(7, token.length),
        {
          secret: app.secret,
        },
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
