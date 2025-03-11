import { Module } from '@nestjs/common';
import { AppsController } from 'src/api/controller/app/app/app.controller';
import { SecretService } from 'src/feature-md/secret/secret.service';
import { AppRepository } from 'src/db/repositories/app/repository';
import { AppsService } from 'src/api/service/app/app.service';
import { JwtService } from '@nestjs/jwt';
import { App } from 'src/db/models/app/app';

@Module({
    controllers: [
        AppsController,
      ],
      providers: [
        SecretService,
        AppRepository,
        AppsService,
        JwtService,
        App,
      ],
})
export class AppsModule {}
