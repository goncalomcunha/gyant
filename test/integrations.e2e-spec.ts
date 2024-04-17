import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestingApp } from './utils/testing-app';
import { HttpService } from '@nestjs/axios';
import { of as ObservableOf } from 'rxjs';

describe('Integrations', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await createTestingApp()
      .overrideProvider(HttpService)
      .useValue({
        post: jest.fn().mockReturnValue(
          ObservableOf({
            data: { status: 'waiting_confirmation' },
          }),
        ),
      })
      .compile();
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should contact the adapter to create the prebooking', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/integrations/appointments')
      .set('content-type', 'application/json')
      .send({
        appointmentId: 'fake',
        slot: {
          provider: {
            name: 'adapter1',
          },
        },
      });

    expect(response.statusCode).toBe(201);
  });
});
