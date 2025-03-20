import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('ManageAppController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/super-admin-app/apps/1 (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/super-admin/login')
      .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
      .expect(201);

    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/super-admin-app/apps/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((response) => {
        return (
          response.body[0].title == 'app1' && response.body[1].title == 'app2'
        );
      });
  }),
    it('/super-admin-app/app/3 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin-app/app/3')
        .send({ title: 'app10' })
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          title: 'app10',
        });
    }),
    it('/super-admin-app/app/10 (PATCH)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .patch('/super-admin-app/app/10')
        .send({ title: 'app10' })
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
        .expect({
          message: 'app not found',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/super-admin-app/app/5 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/super-admin-app/app/5')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect({
          id: 5,
          title: 'app5',
        });
    }),
    it('/super-admin-app/app/5 (DELETE)', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/super-admin/login')
        .send({ email: 'superAdmin@mail.ru', password: 'qwerty' })
        .expect(201);

      const token = loginResponse.body.access_token;

      return request(app.getHttpServer())
        .delete('/super-admin-app/app/5')
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
