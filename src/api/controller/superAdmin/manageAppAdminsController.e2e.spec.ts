import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('ManageAppAdminsController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/super-admin/app-admin/4 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/super-admin/login')
      .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/super-admin/app-admin/4')
      .send({ email: 'newemail@mail.ru' })
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({
        email: 'newemail@mail.ru',
      });
  }),
    it('/super-admin/app-admin/10 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin/app-admin/10')
        .send({ email: 'newemail@mail.ru' })
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'appAdmin not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/super-admin/app-admins/4 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin/app-admins/4')
        .send({ password: 'qwertyui' })
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          message: 'successfully updated',
        });
    }),
    it('/super-admin/app-admins/10 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin/app-admins/10')
        .send({ password: 'qwertyui' })
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'appAdmin not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/super-admin/app-admin/4 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/super-admin/app-admin/4')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          id: 4,
          email: 'newemail@mail.ru',
        });
    }),
    it('/super-admin/app-admin/4 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/super-admin/app-admin/4')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'appAdmin not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    afterAll(async () => {
      await app.close();
    });
});
