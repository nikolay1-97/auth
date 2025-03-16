import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { PasswordService } from 'src/feature-md/password/password.service';
import { User } from 'src/db/models/user/user';
import { ChangeEmailUserDto } from 'src/api/dto/user/admin/userChangeEmail.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('User') private modelClass: ModelClass<User>,
              private readonly passwordService: PasswordService) {}

  async getById(id: number) {
    try {
      const user: User | undefined = await this.modelClass
        .query()
        .findById(id);

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByEmail(email: string) {
    try {
      const user: User[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('email', '=', email);
      
      return user[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByAppid(app_id: number) {
    try {
      const user: User[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('app_id', '=', app_id);
      
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(app_id: number, dto: CreateUserDto) {
    try {
      const secret_data: string = `{"question": "${dto.data.question}", "answer": "${dto.data.answer}"}`
      const data: object = {
        app_id: app_id,
        email: dto.email,
        password: await this.passwordService.getPasswordHash(dto.password),
        data: secret_data,
      }
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changePassword(id: number, password: string) {
    try {
      const newPassword = await this.passwordService.getPasswordHash(password);
      const data: {password: string} = {password: newPassword};
      await this.modelClass
        .query()
        .patch(data)
        .where({ id })
        .returning('*')
        .first();
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeEmail(id: number, dto: ChangeEmailUserDto) {
        try {
          await this.modelClass
            .query()
            .patch(dto)
            .where({ id })
            .returning('*')
            .first();
          return dto;
        } catch (e) {
          console.log(e);
          throw e;
        }
  }

  async delete(id: number) {
    try {
      await this.modelClass.query().deleteById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
