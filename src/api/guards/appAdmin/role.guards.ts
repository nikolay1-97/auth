import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppRepository } from 'src/db/repositories/app/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import {
    ExecutionContext,
    CanActivate,
    BadRequestException,
} from '@nestjs/common';


@Injectable()
export class RoleGuards implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private appRepository: AppRepository,
        private readonly roleRepositrory: RoleRepository,
    ) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const app_id = request['params']['app_id']
        
        const token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = this.jwtService.decode(token.substring(7, token.length))
            
        if (!payload) {
            throw new UnauthorizedException();
        }
        
        const roles = await this.roleRepositrory.getByAppIdAndOwnerId(app_id, payload.sub)
        if (roles.length == 0) {
            throw new UnauthorizedException();
        }

        return true;

    }
}
