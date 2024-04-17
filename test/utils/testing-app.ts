import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { AppointmentsProducer } from '../../src/appointments/appointments.producer';
import { IntegrationsConsumer } from '../../src/integrations/integrations.consumer';
import {
  createFakeAppointmentProducer,
  createFakeIntegrationsConsumer,
} from '../mocks/mocks';

export function createTestingApp(): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(AppointmentsProducer)
    .useValue(createFakeAppointmentProducer())
    .overrideProvider(IntegrationsConsumer)
    .useValue(createFakeIntegrationsConsumer());
}
