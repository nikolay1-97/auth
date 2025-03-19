import { ValidationPipe } from "@nestjs/common";
import { NestApplication } from "@nestjs/core"
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from 'supertest'

describe('UserController (e2e)', () => {
    let app: NestApplication;

    beforeAll(async() => {
        const moduleMixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile() 

        app = moduleMixture.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())
        await app.init()
    })

    it('/users/1 (GET)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).get('/users/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(200).expect(
            response => {
                return response.body.email == 'user1@mail.ru'
            }
        )
    }),
    it('/users (PATCH)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/users/login')
        .send({
            "credentials": {
              "email": "user1@mail.ru",
              "password": "qwerty"
            },
            "appSecret": "qwertyuiop"
          })
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).patch('/users')
        .send({
            "password": "qwerty",
            "appSecret": "qwertyuiop",
            "data": {
              "question": "string1",
              "answer": "string1"
            }
          })
        .set('Authorization', 'Bearer ' + token)
        .expect(200).expect(
            {
                "message": "successfully updated"
              }
        )
    }),
    it('/users (PATCH)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/users/login')
        .send({
            "credentials": {
              "email": "user1@mail.ru",
              "password": "qwerty"
            },
            "appSecret": "qwertyuiop"
          })
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).patch('/users')
        .send({
            "password": "qwerty",
            "appSecret": "qwertyuiop",
            "data": {
              "question": "string2",
              "answer": "string1"
            }
          })
        .set('Authorization', 'Bearer ' + token)
        .expect(400).expect(
            { message: 'incorrect data', error: 'Bad Request', statusCode: 400 }
        )
    }),
    it('/users/register (POST)', async() => {
 
        return request(app.getHttpServer()).post('/users/register')
        .send({
            "credentials": {
                "email": "user4@mail.ru",
                "password": "qwerty"
            },
            "data": {
                "question": "string",
                "answer": "string"
            },
            "secret": "qwertyuiop"
          })
        .expect(201).expect(
            { email: "user4@mail.ru" }
        )
    }),
    it('/users/register (POST)', async() => {
 
        return request(app.getHttpServer()).post('/users/register')
        .send({
            "credentials": {
                "email": "user5@mail.ru",
                "password": "qwerty"
            },
            "data": {
                "question": "string",
                "answer": "string"
            },
            "secret": "qwertyuiopjhnjknkjbkbkj"
          })
        .expect(400).expect(
            { message: 'app not found', error: 'Bad Request', statusCode: 400 }
        )
    }),
    it('/users/register (POST)', async() => {
 
        return request(app.getHttpServer()).post('/users/register')
        .send({
            "credentials": {
                "email": "user4@mail.ru",
                "password": "qwerty"
            },
            "data": {
                "question": "string",
                "answer": "string"
            },
            "secret": "qwertyuiop"
          })
        .expect(400).expect(
            { message: 'user already exists', error: 'Bad Request', statusCode: 400 }
        )
    }),
    it('/users/login (POST)', async() => {

        return request(app.getHttpServer()).post('/users/login')
        .send({
            "credentials": {
              "email": "user1@mail.ru",
              "password": "qwerty"
            },
            "appSecret": "qwertyuiop"
          })
        .expect(201);
    }),
    it('/users/login (POST)', async() => {

        return request(app.getHttpServer()).post('/users/login')
        .send({
            "credentials": {
              "email": "user1@mail.ru",
              "password": "qwertyrjre"
            },
            "appSecret": "qwertyuiop"
          })
        .expect(400).expect({ message: 'неверный логин или пароль', error: 'Bad Request', statusCode: 400 });
    }),
    it('/users/login (POST)', async() => {

        return request(app.getHttpServer()).post('/users/login')
        .send({
            "credentials": {
              "email": "user1@mail.ru",
              "password": "qwerty"
            },
            "appSecret": "qwertyuiopfkwelfkmwpokfop3jf"
          })
        .expect(400).expect({ message: 'app not found', error: 'Bad Request', statusCode: 400 });
    })

    afterAll(async() => {
        await app.close()
    })


})