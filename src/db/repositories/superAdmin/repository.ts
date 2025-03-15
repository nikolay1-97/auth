import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SuperAdmin } from 'src/db/models/superAdmin/superAdmin';

@Injectable()
export class SuperAdminRepository {
  constructor(@Inject('SuperAdmin') private modelClass: ModelClass<SuperAdmin>) {}

  async getByEmail(email: string) {
    try {
      const superAdmin: SuperAdmin[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);
      
      return superAdmin[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
