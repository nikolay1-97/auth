import { Module } from '@nestjs/common';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { AppAdminController } from 'src/api/controller/appAdmin/app-admin/app-admin.controller';
import { AppAdmin } from 'src/db/models/appAdmins/appAdmin';
import { PasswordService } from 'src/feature-md/password/password.service';

@Module({
    controllers: [
    AppAdminController,
  ],
  providers: [
    AppAdminService,
    AppAdminRepository,
    AppAdmin,
    PasswordService,
  ],})
export class AppAdminModule {}
