import { Injectable } from '@nestjs/common';
import { SuperAdminRepository } from 'src/db/repositories/superAdmin/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuperAdminAuthService {
  constructor(
    private readonly superAdminRepository: SuperAdminRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const superAdmin = await this.superAdminRepository.getByEmail(email);
    if (superAdmin) {
      const isValid = await this.passwordService.verify_password(
        password,
        superAdmin.password,
      );
      if (!isValid) {
        return false;
      }
      return superAdmin;
    }
    return false;
  }

  async login(email: string, password: string) {
    const superAdmin = await this.validateUser(email, password);
    if (superAdmin) {
      const payload: { sub: number; username: string } = {
        sub: superAdmin.id,
        username: superAdmin.email,
      };

      const token: string = await this.jwtService.sign(payload, {
        secret: this.configService.get('SUPER_ADMIN_SECRET'),
        expiresIn: this.configService.get('EXPIRE_JWT'),
      });
      return { access_token: token };
    }
    return false;
  }
}
