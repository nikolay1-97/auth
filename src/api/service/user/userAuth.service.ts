import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user/repository';
import { AppRepository } from 'src/db/repositories/app/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appRepository: AppRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (user) {
      const isValid = await this.passwordService.verify_password(
        password,
        user.password,
      );
      if (!isValid) {
        return false;
      }
      return user;
    }
    return false;
  }

  async login(email: string, password: string, secret: string) {
    const user = await this.validateUser(email, password);
    if (user) {
      const app = await this.appRepository.getBySecret(secret)
      if (!app) {
        return false
      }
      const payload: {
        sub: number,
        username: string,
    } = { sub: user.id, username: user.email };

      const token: string = await this.jwtService.signAsync(payload, {
        secret: app.secret,
        expiresIn: this.configService.get('EXPIRE_JWT'),
      });
      return { access_token: token };
    }
    return false;
  }
}
