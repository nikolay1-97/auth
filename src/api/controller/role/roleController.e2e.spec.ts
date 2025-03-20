import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('RoleController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/roles/1 (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/app-admins/login')
      .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/roles/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].title == 'role1' && response.body[1].title == 'role2'
        );
      });
  }),
    it('/roles/3 (GET)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .get('/roles/3')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/3/roles/3 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/3/roles/3')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'new_role1' })
        .expect(200)
        .expect({
          newTitle: 'new_role1',
        });
    }),
    it('/roles/apps/3/roles/1 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/3/roles/1')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'new_role1' })
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/1/roles/3 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/1/roles/3')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'new_role1' })
        .expect(400)
        .expect({
          message: 'roles not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/roles/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'role5',
          app_id: 3,
        })
        .expect(201)
        .expect({ title: 'role5', app_id: 3 });
    }),
    it('/roles/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/roles/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'role5',
          app_id: 3,
        })
        .expect(400)
        .expect({
          message: 'role already exists',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/create (POST)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/roles/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'role6',
          app_id: 3,
        })
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/3/role/3 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/3/role/3')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          id: 3,
          app_id: 3,
          title: 'new_role1',
        });
    }),
    it('/roles/apps/1/role/3 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/1/role/3')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'roles not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/3/role/1 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/3/role/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    });

  afterAll(async () => {
    await app.close();
  });
});
