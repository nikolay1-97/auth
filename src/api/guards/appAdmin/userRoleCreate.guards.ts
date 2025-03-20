import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/repositories/user/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import {
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UserRoleCreateGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const app_id = request['params']['app_id'];
    const user_id = request['body'].user_id;
    const role_id = request['body'].role_id;

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token.substring(7, token.length));

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.getByAppIdAndOwnerId(
      app_id,
      payload.sub,
      user_id,
    );

    const role = await this.roleRepository.getByAppIdAndOwnerId(
      app_id,
      payload.sub,
      role_id,
    );

    if (!user || !role) {
      throw new BadRequestException('user or role not found');
    }

    return true;
  }
}
