import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { faker } from '@faker-js/faker';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Appointment } from '../src/appointments/appointment.schema';
import { Factory } from './utils/factory';
import { createTestingApp } from './utils/testing-app';

describe('Appointments', () => {
  let app: INestApplication;
  let connection: Connection;
  let factory: Factory;

  beforeEach(async () => {
    const moduleFixture = await createTestingApp().compile();
    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();

    connection = await moduleFixture.get(getConnectionToken());
    factory = new Factory(connection);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should start the appointment prebooking process', async () => {
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

  it('should receive the webhook from the external providers and confirm the appointment', async () => {
    const appointment = await factory.createAppointment({
      status: 'waiting_confirmation',
    });
    const appointmentId = appointment.appointmentId;

    const response = await request(app.getHttpServer())
      .post('/api/v1/appointments-webhooks/status')
      .set('content-type', 'application/json')
      .send({ appointmentId: appointmentId, status: 'confirmed' });

    const persistedAppointment = await connection.db
      .collection('appointments')
      .findOne<Appointment>({ appointmentId });
    expect(response.statusCode).toBe(202);
    expect(persistedAppointment.status).toBe('confirmed');
    expect(persistedAppointment.slot.status).toBe('taken');
  });

  it('should leave the slot available if the appointment was rejected by the external provider', async () => {
    const appointment = await factory.createAppointment({
      status: 'waiting_confirmation',
    });
    const appointmentId = appointment.appointmentId;

    const response = await request(app.getHttpServer())
      .post('/api/v1/appointments-webhooks/status')
      .set('content-type', 'application/json')
      .send({ appointmentId: appointmentId, status: 'rejected' });

    const persistedAppointment = await connection.db
      .collection('appointments')
      .findOne<Appointment>({ appointmentId });
    expect(response.statusCode).toBe(202);
    expect(persistedAppointment.status).toBe('rejected');
    expect(persistedAppointment.slot.status).toBe('available');
  });
});
