import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async getPasswordHash(password: string): Promise<string> {
    const salt = this.configService.get('salt');

    return await bcrypt.hash(password, parseInt(salt));
  }

  async verify_password(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
