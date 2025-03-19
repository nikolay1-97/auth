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
        return response.body.title == 'role1';
      });
  }),
    it('/roles/2 (GET)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .get('/roles/2')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/1/roles/1 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/1/roles/1')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'new_role1' })
        .expect(200)
        .expect({
          newTitle: 'new_role1',
        });
    }),
    it('/roles/apps/2/roles/1 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/2/roles/1')
        .set('Authorization', 'Bearer ' + token)
        .send({ title: 'new_role1' })
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/1/roles/2 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/roles/apps/1/roles/2')
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
        .send({ email: 'appAdmin1@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .post('/roles/create')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'role4',
          app_id: 1,
        })
        .expect(201)
        .expect({ title: 'role4', app_id: 1 });
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
          title: 'role4',
          app_id: 1,
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
          title: 'role5',
          app_id: 2,
        })
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/2/role/3 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/2/role/3')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          id: 3,
          app_id: 2,
          title: 'role3',
        });
    }),
    it('/roles/apps/2/role/1 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/2/role/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'roles not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/roles/apps/1/role/1 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({ email: 'appAdmin2@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/roles/apps/1/role/1')
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
