import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    if (!process.env.API_KEY) {
      throw new Error('API_KEY is not set in environment variables.');
    }

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', process.env.API_KEY)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
