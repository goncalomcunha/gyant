import { AppointmentsProducer } from '../../src/appointments/appointments.producer';
import { IntegrationsConsumer } from '../../src/integrations/integrations.consumer';

export const fakeAppointmentProducer: Partial<AppointmentsProducer> = {
  enqueuePrebooking: jest.fn().mockResolvedValue(null),
};

export const fakeIntegrationsConsumer: Partial<IntegrationsConsumer> = {
  onModuleInit: jest.fn(),
};
