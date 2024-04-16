import { faker } from '@faker-js/faker';
import { Patient } from '../../src/patients/patient.schema';
import { Connection } from 'mongoose';
import { Appointment } from '../../src/appointments/appointment.schema';
import { Slot } from '../../src/slots/slot.schema';

export class Factory {
  constructor(private readonly connection: Connection) {}

  async createAppointment(
    overrides: Partial<Appointment> = {},
  ): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.appointmentId = overrides.appointmentId ?? faker.string.uuid();
    appointment.status =
      overrides.status ??
      faker.helpers.arrayElement([
        'waiting_confirmation',
        'confirmed',
        'canceled',
      ]);
    appointment.slot = overrides.slot ?? (await this.createSlot());

    await this.connection.db.collection('appointments').insertOne(appointment);

    return appointment;
  }

  async createSlot(overrides: Partial<Slot> = {}): Promise<Slot> {
    const slot = new Slot();
    slot.code = overrides.code ?? faker.string.uuid();
    slot.startsAt = overrides.startsAt ?? faker.date.soon();
    slot.status =
      overrides.status ??
      faker.helpers.arrayElement(['reserved', 'available', 'confirmed']);

    await this.connection.db.collection('slots').insertOne(slot);

    return slot;
  }

  async createPatient(overrides: Partial<Patient> = {}): Promise<Patient> {
    const patient = new Patient();
    patient.name = overrides.name ?? faker.person.fullName();

    await this.connection.db.collection('patients').insertOne(patient);

    return patient;
  }
}
