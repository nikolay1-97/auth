import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AppAdmin } from 'src/db/models/appAdmins/appAdmin';
import { CreateAppAdminDto } from 'src/api/dto/appAdmin/appAdminCreate.dto';
import { PasswordService } from 'src/feature-md/password/password.service';

@Injectable()
export class AppAdminRepository {
  constructor(@Inject('AppAdmin') private modelClass: ModelClass<AppAdmin>,
              private readonly passwordService: PasswordService) {}

  async getById(id: number) {
    try {
      const appAdmin: AppAdmin | undefined = await this.modelClass
        .query()
        .findById(id);

      return appAdmin;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByEmail(email: string) {
    try {
      const appAdmin: AppAdmin[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);
      
      return appAdmin[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(dto: CreateAppAdminDto) {
    try {
      const data: object = {
        email: dto.email,
        password: await this.passwordService.getPasswordHash(dto.password)
      }
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
