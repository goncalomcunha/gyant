import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestingApp } from './utils/testing-app';

describe('Integrations', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await createTestingApp().compile();
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should contact the adapter to create the prebooking', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/integrations/appointments')
      .set('content-type', 'application/json');

    expect(response.statusCode).toBe(201);
  });
});
