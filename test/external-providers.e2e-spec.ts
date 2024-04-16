import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { faker } from '@faker-js/faker';
import { createTestingApp } from './utils/testing-app';

describe('External providers', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await createTestingApp().compile();
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('allows to request an appointment prebooking', async () => {
    const response = await request(app.getHttpServer())
      .post('/fake-external-provider/appointment')
      .set('content-type', 'application/json')
      .send({
        slot_id: faker.string.uuid(),
        appointmentId: faker.string.uuid(),
        patientData: { name: faker.person.fullName() },
      });
    expect(response.statusCode).toBe(202);
    expect(response.text).toBe('OK');
  });
});
