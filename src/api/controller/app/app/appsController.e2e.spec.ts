import { ValidationPipe } from "@nestjs/common";
import { NestApplication } from "@nestjs/core"
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from 'supertest'

describe('AppController (e2e)', () => {
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
        .send({email: 'appAdmin2@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).get('/apps')
        .set('Authorization', 'Bearer ' + token)
        .expect(200).expect(
            response => {
                return response.body.title == 'app2'
            }
        )
    }),
    it('/apps (PATCH)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).patch('/apps/1')
        .set('Authorization', 'Bearer ' + token)
        .expect(200).expect(
            {
                message: "successfully updated"
              }
        )
    }),
    it('/apps (PATCH)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).patch('/apps/2')
        .set('Authorization', 'Bearer ' + token)
        .expect(400).expect(
            { message: 'app not found', error: 'Bad Request', statusCode: 400 }
        )
    }),
    it('/apps/register (POST)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token
 
        return request(app.getHttpServer()).post('/apps/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            "title": "app4",
          })
        .expect(201).expect(
            { title: "app4" }
        )
    }),
    it('/apps/register (POST)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token
 
        return request(app.getHttpServer()).post('/apps/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            "title": "app4",
          })
        .expect(400).expect(
            { message: 'app already exists', error: 'Bad Request', statusCode: 400 }
        )
    }),
    it('/apps (DELETE)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).delete('/apps/3')
        .set('Authorization', 'Bearer ' + token)
        .expect(200).expect(
            {
                "id": 3,
                "title": "app3"
              }
        )
    }),
    it('/apps (DELETE)', async() => {
        const loginResponse = await request(app.getHttpServer())
        .post('/app-admins/login')
        .send({email: 'appAdmin1@mail.ru', password: 'qwerty'})
        .expect(201);

        const token = loginResponse.body.access_token

        return request(app.getHttpServer()).delete('/apps/10')
        .set('Authorization', 'Bearer ' + token)
        .expect(400).expect(
            { message: 'app not found', error: 'Bad Request', statusCode: 400 }
        )
    })

    afterAll(async() => {
        await app.close()
    })


})