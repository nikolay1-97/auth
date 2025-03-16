import { Module } from '@nestjs/common';
import { SuperAdminAuthService } from 'src/api/service/superAdmin/superAdminAuth.service';
import { SuperAdminRepository } from 'src/db/repositories/superAdmin/repository';
import { SuperAdminAuthController } from 'src/api/controller/superAdmin/superAdminAuth.controller';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ManageAppAdminsController } from 'src/api/controller/superAdmin/manageAppAdmins.controller';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { AppAdmin } from 'src/db/models/appAdmins/appAdmin';

@Module({
    controllers: [
    SuperAdminAuthController,
    ManageAppAdminsController,
  ],
  providers: [
    SuperAdminAuthService,
    AppAdminService,
    AppAdminRepository,
    SuperAdminRepository,
    SuperAdmin,
    AppAdmin,
    PasswordService,
    JwtService,
  ],})
export class SuperAdminModule {}
