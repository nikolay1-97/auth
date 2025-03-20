import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/repositories/user/repository';
import {
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AppAdminUsersGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userRepositrory: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const app_id = request['params']['app_id'];
    const user_id = request['params']['user_id'];

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token.substring(7, token.length));

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepositrory.getByAppIdAndOwnerId(
      app_id,
      payload.sub,
      user_id,
    );
    if (!user) {
      throw new BadRequestException('users not found');
    }

    return true;
  }

}
