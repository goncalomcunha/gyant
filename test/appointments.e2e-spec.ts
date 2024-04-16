import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { faker } from '@faker-js/faker';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Factory } from './utils/factory';
import { Appointment } from '../src/appointments/appointment.schema';

describe('Appointments', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();

    connection = await moduleFixture.get(getConnectionToken());
  });

  afterEach(async () => {
    await app.close();
  });

  it('allows to start the appointment prebooking process', async () => {
    const slotId = faker.string.uuid();
    const response = await request(app.getHttpServer())
      .post('/api/v1/appointments')
      .set('content-type', 'application/json')
      .send({ slotId });

    const appointment: Appointment = response.body;
    const persistedAppointment = await connection.db
      .collection('appointments')
      .findOne<Appointment>({ 'slot.code': slotId });
    expect(response.statusCode).toBe(201);
    expect(appointment.appointmentId).toBeTruthy();
    expect(persistedAppointment).toBeTruthy();
    expect(persistedAppointment.appointmentId).toBe(appointment.appointmentId);
    expect(persistedAppointment.slot.status).toBe('reserved');
  });
});
