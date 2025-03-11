import { Module, Global } from '@nestjs/common';
import { AppAdmin } from './models/appAdmins/appAdmin';
import { SuperAdmin } from './models/superAdmin/superAdmin';
import { User } from './models/user/user';
import { App } from './models/app/app';
import { Role } from './models/role/role';
import { UserRole } from './models/userRole/userRole';
import { knexSnakeCaseMappers } from 'objection';
import { Model } from 'objection';
import { knex } from 'knex';
import config from '../configuration/index';

const models = [AppAdmin, SuperAdmin, App, User, Role, UserRole];
const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: () => {
      const db = knex({
        client: 'pg',
        connection: config().db_url,
        ...knexSnakeCaseMappers,
      });
      Model.knex(db);
      return db;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
