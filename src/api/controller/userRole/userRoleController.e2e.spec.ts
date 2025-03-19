import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('UserRoleController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/userRoles/apps/1/create (POST)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/app-admins/login')
      .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .post('/userRoles/apps/1/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        user_id: 1,
        role_id: 1,
      })
      .expect(201)
      .expect({ user_id: 1, role_id: 1 });
  }),
    it('/userRoles/apps/1/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/userRoles/apps/1/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          user_id: 1,
          role_id: 1,
        })
        .expect(400)
        .expect({
          message: 'row of userRole already exists',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/2/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/userRoles/apps/2/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          user_id: 1,
          role_id: 1,
        })
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/1/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/userRoles/apps/1/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          user_id: 2,
          role_id: 1,
        })
        .expect(400)
        .expect({
          message: 'user or role not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/1/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/userRoles/apps/1/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          user_id: 1,
          role_id: 2,
        })
        .expect(400)
        .expect({
          message: 'user or role not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/1/users/1 (GET)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .get('/userRoles/apps/1/users/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect([{ id: 1, title: 'role1' }]);
    }),
    it('/userRoles/apps/2/users/1 (GET)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .get('/userRoles/apps/2/users/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/1/users/2 (GET)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .get('/userRoles/apps/1/users/2')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'users not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/userRoles/apps/1/users/1/roles/1 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/userRoles/apps/1/users/1/roles/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({ user_id: 1, role_id: 1 });
    }),
    it('/userRoles/apps/1/users/1/roles/1 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/userRoles/apps/1/users/1/roles/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'row of userRole not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    afterAll(async () => {
      await app.close();
    });
});
