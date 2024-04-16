import { faker } from '@faker-js/faker';
import { Patient } from '../../src/patients/patient.schema';
import { Connection } from 'mongoose';

export class Factory {
  constructor(private readonly connection: Connection) {}

  async createPatient(overrides: Partial<Patient> = {}): Promise<Patient> {
    const patient = new Patient();
    patient.name = overrides.name || faker.person.fullName();

    await this.connection.db.collection('patients').insertOne(patient);

    return patient;
  }
}
