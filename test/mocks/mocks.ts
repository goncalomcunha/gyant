import { AppointmentsProducer } from '../../src/appointments/appointments.producer';
import { IntegrationsConsumer } from '../../src/integrations/integrations.consumer';

export function createFakeAppointmentProducer(): Partial<AppointmentsProducer> {
  return {
    enqueuePrebooking: jest.fn().mockResolvedValue(null),
    enqueueConfirmedAppointment: jest.fn().mockResolvedValue(null),
  };
}

export function createFakeIntegrationsConsumer(): Partial<IntegrationsConsumer> {
  return {
    onModuleInit: jest.fn(),
  };
}
