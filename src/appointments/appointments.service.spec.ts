import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { AppointmentsProducer } from './appointments.producer';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const fakeAppointmentsProducer: Partial<AppointmentsProducer> = {
    enqueuePrebooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getModelToken(Appointment.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: AppointmentsProducer,
          useValue: fakeAppointmentsProducer,
        },
      ],
    }).compile();

    service = module.get(AppointmentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delegate to the producer to enqueue the prebooking message', async () => {
    const spy = jest
      .spyOn(fakeAppointmentsProducer, 'enqueuePrebooking')
      .mockResolvedValue(null);
    await service.create({ slotId: 'fake' });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
