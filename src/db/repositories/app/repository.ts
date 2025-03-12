import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';
import { App } from 'src/db/models/app/app';
import { CreateAppDto } from 'src/api/dto/app/appCreate.dto';

@Injectable()
export class AppRepository {
  constructor(@Inject('App') private modelClass: ModelClass<App>) {}

  async getById(id: number) {
    try {
      const app: App | undefined = await this.modelClass
        .query()
        .findById(id);

      return app;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getBySecret(secret: string) {
    try {
      const app: App[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('secret', '=', secret);
      
      return app[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByTitle(title: string) {
    try {
      const app: App[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('title', '=', title);
      
      return app[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getByOwnerId(owner_id: number) {
    try {
      const app: App[] | undefined = await this.modelClass
        .query()
        .select('*')
        .where('owner_id', '=', owner_id);
      
      return app;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(
    appAdminId: number,
    secret: string,
    dto: CreateAppDto,
  ) {
    try {
      const data: object = {
        title: dto.title,
        secret: secret,
        owner_id: appAdminId,
      }
      await this.modelClass.query().insert(data);
      return dto;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: number, secret: string) {
    try {
      const data: {secret: string} = {secret: secret}
      await this.modelClass
        .query()
        .patch(data)
        .where({ id })
        .returning('*')
        .first();
      return secret;
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
