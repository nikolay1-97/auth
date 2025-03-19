import { Module } from '@nestjs/common';
import { UserService } from 'src/api/service/user/user.service';
import { UserRepository } from 'src/db/repositories/user/repository';
import { AppRepository } from 'src/db/repositories/app/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { UserRoleRepository } from 'src/db/repositories/userRole/repository';
import { UserController } from 'src/api/controller/user/user.controller';
import { User } from 'src/db/models/user/user';
import { PasswordService } from 'src/feature-md/password/password.service';
import { UserAuthService } from 'src/api/service/user/userAuth.service';
//import { AppAdminJwtStrategy } from 'src/feature-md/Strategy/appAdmin/appAdminStrategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    RoleRepository,
    UserRoleRepository,
    User,
    PasswordService,
    AppRepository,
    UserAuthService,
    //AppAdminJwtStrategy,
    JwtService,
  ],
})
export class UserModule {}
