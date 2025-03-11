import { Injectable } from '@nestjs/common';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppAdminAuthService {
  constructor(
    private readonly appAdminRepository: AppAdminRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const appAdmin = await this.appAdminRepository.getByEmail(email);
    if (appAdmin) {
      const isValid = await this.passwordService.verify_password(
        password,
        appAdmin.password,
      );
      if (!isValid) {
        return false;
      }
      return appAdmin;
    }
    return false;
  }

  async login(email: string, password: string) {
    const appAdmin = await this.validateUser(email, password);
    if (appAdmin) {
      const payload = { sub: appAdmin.id, username: appAdmin.email };

      const token: string = await this.jwtService.sign(payload, {
        secret: this.configService.get('APP_ADMIN_SECRET'),
        expiresIn: this.configService.get('EXPIRE_JWT'),
      });
      return { access_token: token };
    }
    return false;
  }
}
