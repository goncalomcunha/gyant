import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

describe('Providers', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('can get the list of all providers', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/providers',
    );
    expect(response.statusCode).toBe(200);
  });

  it('can create a provider', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/providers')
      .set('content-type', 'application/json')
      .send({ foo: 'bar' });
    expect(response.statusCode).toBe(201);
  });
});
