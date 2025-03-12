import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { PasswordService } from 'src/feature-md/password/password.service';
import { User } from 'src/db/models/user/user';

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
}
