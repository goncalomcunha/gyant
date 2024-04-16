import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { AppointmentsProducer } from '../../src/appointments/appointments.producer';
import { IntegrationsConsumer } from '../../src/integrations/integrations.consumer';
import {
  fakeAppointmentProducer,
  fakeIntegrationsConsumer,
} from '../mocks/mocks';

export function createTestingApp(): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(AppointmentsProducer)
    .useValue(fakeAppointmentProducer)
    .overrideProvider(IntegrationsConsumer)
    .useValue(fakeIntegrationsConsumer);
}
