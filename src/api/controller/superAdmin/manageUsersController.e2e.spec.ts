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

  it('/super-admin-users/user/10 (PATCH)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/super-admin/login')
      .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .patch('/super-admin-users/user/10')
      .send({ email: 'newemail@mail.ru' })
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
      .expect({
        message: 'user not found',
        error: 'Bad Request',
        statusCode: 400,
      });
  }),
    it('/super-admin-users/users/1 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin-users/users/1')
        .send({ password: 'qwertyui' })
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          message: 'successfully updated',
        });
    }),
    it('/super-admin-users/users/10 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin-users/users/10')
        .send({ password: 'qwertyui' })
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'user not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    afterAll(async () => {
      await app.close();
    });
});
