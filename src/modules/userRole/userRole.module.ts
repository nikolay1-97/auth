import { Module } from '@nestjs/common';
import { UserRoleController } from 'src/api/controller/userRole/userRole.controller';
import { UserRoleRepository } from 'src/db/repositories/userRole/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { UserRepository } from 'src/db/repositories/user/repository';
import { UserRoleService } from 'src/api/service/userRole/userRole.service.dto';
import { PasswordService } from 'src/feature-md/password/password.service';
import { UserRole } from 'src/db/models/userRole/userRole';
import { JwtService } from '@nestjs/jwt';
import { AppRepository } from 'src/db/repositories/app/repository';

@Module({
  controllers: [UserRoleController],
  providers: [
    UserRoleService,
    UserRoleRepository,
    RoleRepository,
    UserRepository,
    UserRole,
    PasswordService,
    JwtService,
    AppRepository,
  ],
})
export class UserRoleModule {}
