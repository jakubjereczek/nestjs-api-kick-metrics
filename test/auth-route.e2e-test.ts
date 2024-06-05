import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Players (e2e)', () => {
  let app: INestApplication;
  let token: string | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'jankowalski@gmail.com',
        username: 'jankowalski',
        password: '123457',
      })
      .expect(409); // account already exists
  });

  describe('/auth/login (POST)', () => {
    it('the account does not exist', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'abcd@gmail.com',
          password: '123457',
        })
        .expect(401); // unauthorized
    });

    it('the account has diff pass', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jankowalski@gmail.com',
          password: '12345744',
        })
        .expect(401); // account already exists
    });

    it('the account exists and valid pass', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'jankowalski@gmail.com',
          password: '123457',
        })
        .expect(200)
        .expect((response) => {
          token = response.headers['authorization'];
          expect(response.headers).toMatchObject({
            ...response.headers,
            authorization: expect.stringContaining('Bearer '),
          });
        });
    });
  });

  describe('/auth/profile (GET)', () => {
    it('return error for not authed', () => {
      return request(app.getHttpServer()).get('/auth/profile').expect(401);
    });

    it('return user data for authed', () => {
      return request(app.getHttpServer())
        .get('/auth/profile')
        .set('authorization', token)
        .expect(200)
        .expect((response) => {
          expect(response.body).toMatchObject({
            id: '4BDB19B2-6BC0-411C-9CF2-61F14B7B2333',
            email: 'jankowalski@gmail.com',
            username: 'jankowalski',
            role: 'user',
            iat: expect.any(Number),
            exp: expect.any(Number),
          });
        });
    });
  });
});
