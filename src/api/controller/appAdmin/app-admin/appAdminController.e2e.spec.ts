import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AppAdminController (e2e)', () => {
  let app: NestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/app-admins/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/app-admins/register')
      .send({
        email: 'appAdmin4@mail.ru',
        password: 'qwerty',
      })
      .expect(201)
      .expect({ email: 'appAdmin4@mail.ru' });
  }),
    it('/app-admins/register (POST)', async () => {
      return request(app.getHttpServer())
        .post('/app-admins/register')
        .send({
          email: 'appAdmin4@mail.ru',
          password: 'qwerty',
        })
        .expect(400)
        .expect({
          message: 'appAdmin already exists',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    it('/app-admins/login (POST)', async () => {
      return request(app.getHttpServer())
        .post('/app-admins/login')
        .send({
          email: 'appAdmin1@mail.ru',
          password: 'qwerty',
        })
        .expect(201);
    }),
    it('/app-admins/login (POST)', async () => {
      return request(app.getHttpServer())
        .post('/app-admins/login')
        .send({
          email: 'appAdmin1@mail.ru',
          password: 'qwertyrjre',
        })
        .expect(400)
        .expect({
          message: 'неверный логин или пароль',
          error: 'Bad Request',
          statusCode: 400,
        });
    }),
    afterAll(async () => {
      await app.close();
    });
});
