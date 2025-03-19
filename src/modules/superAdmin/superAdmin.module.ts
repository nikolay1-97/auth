import { Module } from '@nestjs/common';
import { SuperAdminAuthService } from 'src/api/service/superAdmin/superAdminAuth.service';
import { SuperAdminRepository } from 'src/db/repositories/superAdmin/repository';
import { SuperAdminAuthController } from 'src/api/controller/superAdmin/superAdminAuth.controller';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ManageAppAdminsController } from 'src/api/controller/superAdmin/manageAppAdmins.controller';
import { ManageUsersController } from 'src/api/controller/superAdmin/manageUsers.controller';
import { ManageAppsController } from 'src/api/controller/superAdmin/manageApp.controller';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { UserRepository } from 'src/db/repositories/user/repository';
import { UserService } from 'src/api/service/user/user.service';
import { AppRepository } from 'src/db/repositories/app/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { AppsService } from 'src/api/service/app/app.service';
import { SecretService } from 'src/feature-md/secret/secret.service';
import { User } from 'src/db/models/user/user';
import { AppAdmin } from 'src/db/models/appAdmins/appAdmin';
import { SuperAdminJwtStrategy } from 'src/feature-md/Strategy/superAdmin/superAdminStrategy';

@Module({
  controllers: [
    SuperAdminAuthController,
    ManageAppAdminsController,
    ManageUsersController,
    ManageAppsController,
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
    AppsService,
    SuperAdminRepository,
    SuperAdmin,
    AppAdmin,
    PasswordService,
    SecretService,
    JwtService,
    SuperAdminJwtStrategy,
  ],
})
export class SuperAdminModule {}
