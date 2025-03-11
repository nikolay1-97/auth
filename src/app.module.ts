import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureMdModule } from './feature-md/feature-md.module';
import { DatabaseModule } from './db/database.module';
import { AppAdminModule } from './modules/appAdmin/app-admin/app-admin.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    AppAdminModule,
    DatabaseModule,
    FeatureMdModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
