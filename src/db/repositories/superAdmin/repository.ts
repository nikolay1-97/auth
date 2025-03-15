import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuperAdminRepository {
  constructor(@Inject('SuperAdmin') private modelClass: ModelClass<SuperAdmin>,
              private readonly configService: ConfigService) {}


  async create(email: string, password: string) {
    try {
      const salt = this.configService.get('salt')
      const data: object = {
        email: email,
        password: await bcrypt.hash(password, parseInt(salt))
      }
      await this.modelClass.query().insert(data);
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
