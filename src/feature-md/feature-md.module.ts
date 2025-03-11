import { Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';

@Module({
  providers: [PasswordService],
})
export class FeatureMdModule {}
