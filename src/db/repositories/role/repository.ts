import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { Role } from 'src/db/models/role/role';
import { CreateRoleDto } from 'src/api/dto/role/roleCreate.dto';
import { RoleChangeTitleDto } from 'src/api/dto/role/roleChangeTitle.dto';

@Injectable()
export class RoleRepository {
  constructor(@Inject('Role') private modelClass: ModelClass<Role>) {}

  async getById(id: number) {
    try {
      const role: Role | undefined = await this.modelClass.query().findById(id);

      return role;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByAppId(app_id: number) {
    try {
      const role: Role[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('app_id', '=', app_id);

      return role;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByAppIdAndOwnerId(app_id: number, owner_id: number) {
    try {
      const roles: Role[] | undefined = await this.modelClass
        .query()
        .where('roles.app_id', '=', app_id)
        .where('owner_id', '=', owner_id)
        .join('app', 'roles.app_id', '=', 'app.id')
        .join('app_admin', 'app_admin.id', '=', 'app.owner_id')
        .select('roles.id', 'roles.title');

      return roles;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByTitle(title: string) {
    try {
      const role: Role[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('title', '=', title);

      return role[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByAppIdAndTitle(app_id: number, title: string) {
    try {
      const role: Role[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('app_id', '=', app_id)
        .where('title', '=', title);

      return role[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(dto: CreateRoleDto) {
    try {
      await this.modelClass.query().insert(dto);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async changeTitle(id: number, dto: RoleChangeTitleDto) {
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
