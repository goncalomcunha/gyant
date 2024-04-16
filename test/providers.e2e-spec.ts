import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Providers', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('can get the list of all providers', async () => {
    const response = await request(app.getHttpServer()).get('/providers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
