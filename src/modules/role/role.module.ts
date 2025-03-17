import { Module } from '@nestjs/common';
import { RoleController } from 'src/api/controller/role/role.controller.dto';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { RoleService } from 'src/api/service/role/role.service';
import { AppRepository } from 'src/db/repositories/app/repository';
import { Role } from 'src/db/models/role/role';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [
        RoleController,
      ],
      providers: [
        RoleService,
        RoleRepository,
        AppRepository,
        Role,
        JwtService,
      ],
})
export class RoleModule {}
