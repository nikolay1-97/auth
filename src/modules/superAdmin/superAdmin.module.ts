import { Module } from '@nestjs/common';
import { SuperAdminAuthService } from 'src/api/service/superAdmin/superAdminAuth.service';
import { SuperAdminRepository } from 'src/db/repositories/superAdmin/repository';
import { SuperAdminAuthController } from 'src/api/controller/superAdmin/superAdminAuth.controller';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [
    SuperAdminAuthController,
  ],
  providers: [
    SuperAdminAuthService,
    SuperAdminRepository,
    SuperAdmin,
    PasswordService,
    JwtService,
  ],})
export class SuperAdminModule {}
