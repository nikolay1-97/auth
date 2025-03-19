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
        const app_id = request['params']['app_id']
        const user_id = request['body'].user_id
        const role_id = request['body'].role_id
        
        const token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = this.jwtService.decode(token.substring(7, token.length))
            
        if (!payload) {
            throw new UnauthorizedException();
        }
        let cnt: number = 0;

        const users = await this.userRepository.getByAppIdAndOwnerId(app_id, payload.sub)
        if (users.length == 0) {
            throw new BadRequestException('users not found');
        }

        for (let count=0; count <= users.length-1; count++) {
            if (users[count].id == user_id) {
                cnt = cnt + 1;
            }
        }

        const roles = await this.roleRepository.getByAppIdAndOwnerId(app_id, payload.sub)
        if (roles.length == 0) {
            throw new BadRequestException('roles not found');
        }

        for (let count=0; count <= roles.length-1; count++) {
            if (roles[count].id == role_id) {
                cnt = cnt + 1;
            }
        }
        
        if (cnt != 2) {
            throw new BadRequestException('user or role not found');
        }

        return true;

    }
}
