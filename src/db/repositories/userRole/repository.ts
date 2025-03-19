import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserRole } from 'src/db/models/userRole/userRole';
import { CreateUserRoleDto } from 'src/api/dto/userRole/userRoleCreate.dto';

@Injectable()
export class UserRoleRepository {
  constructor(@Inject('UserRole') private modelClass: ModelClass<UserRole>) {}

  async create(dto: CreateUserRoleDto) {
    try {
      await this.modelClass.query().insert(dto);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(user_id: number, role_id: number) {
    try {
      await this.modelClass
        .query()
        .delete()
        .where('user_id', '=', user_id)
        .where('role_id', '=', role_id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getUserRoles(user_id: number) {
    try {
      const roles: UserRole[] | undefined = await this.modelClass
        .query()
        .where('user_id', '=', user_id)
        .join('roles', 'roles.id', '=', 'role_id')
        .select('roles.id', 'title');
      return roles;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getRowByUserIdAndRoleId(user_id: number, role_id: number) {
    try {
      const userRoles: UserRole[] | undefined = await this.modelClass
        .query()
        .where('user_id', '=', user_id)
        .where('role_id', '=', role_id)
        .select('*');
      return userRoles[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
