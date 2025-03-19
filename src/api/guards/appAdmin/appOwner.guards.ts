import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppRepository } from 'src/db/repositories/app/repository';
import {
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AppOwnerGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private appRepository: AppRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const app_id = request['params']['app_id'];

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token.substring(7, token.length));

    if (!payload) {
      throw new UnauthorizedException();
    }

    const apps = await this.appRepository.getByOwnerId(payload.sub);
    console.log(apps);
    if (apps.length == 0) {
      throw new BadRequestException('app not found');
    }
    for (let count = 0; count <= apps.length - 1; count++) {
      if (apps[count].id == app_id) {
        return true;
      }
    }

    throw new BadRequestException('app not found');
  }
}
