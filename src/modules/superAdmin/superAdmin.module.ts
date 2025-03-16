import { Module } from '@nestjs/common';
import { SuperAdminAuthService } from 'src/api/service/superAdmin/superAdminAuth.service';
import { SuperAdminRepository } from 'src/db/repositories/superAdmin/repository';
import { SuperAdminAuthController } from 'src/api/controller/superAdmin/superAdminAuth.controller';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ManageAppAdminsController } from 'src/api/controller/superAdmin/manageAppAdmins.controller';
import { ManageUsersController } from 'src/api/controller/superAdmin/manageUsers.controller';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { UserRepository } from 'src/db/repositories/user/repository';
import { UserService } from 'src/api/service/user/user.service';
import { AppRepository } from 'src/db/repositories/app/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { User } from 'src/db/models/user/user';
import { AppAdmin } from 'src/db/models/appAdmins/appAdmin';

@Module({
    controllers: [
    SuperAdminAuthController,
    ManageAppAdminsController,
    ManageUsersController,
  ],
  providers: [
    SuperAdminAuthService,
    AppAdminService,
    AppAdminRepository,
    UserRepository,
    UserService,
    User,
    RoleRepository,
    AppRepository,
    SuperAdminRepository,
    SuperAdmin,
    AppAdmin,
    PasswordService,
    JwtService,
  ],})
export class SuperAdminModule {}
