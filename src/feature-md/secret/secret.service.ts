import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SecretService {

  async getSecret() {
    const secret: string = uuid()
    return secret
  }

}
