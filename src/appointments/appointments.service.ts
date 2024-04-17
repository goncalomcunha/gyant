import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatusUpdateDto } from './dto/appointment-status-update.dto';
import { AppointmentsProducer } from './appointments.producer';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    private readonly appointmentsProducer: AppointmentsProducer,
  ) {}

  async find(): Promise<Appointment[]> {
    return await this.appointmentModel.find().sort({ name: 'desc' }).exec();
  }

  async create(params: CreateAppointmentDto): Promise<Appointment> {
    // TODO: validate if slot is still available
    const appointmentId = String(Date.now());

    const appointment = new Appointment({
      appointmentId: appointmentId,
      slot: {
        code: params.slotId,
        startsAt: new Date(),
        status: 'reserved',
        provider: {
          name: Number(appointmentId) % 2 === 0 ? 'adapter1' : 'adapter2',
        },
      },
    });

    const createdAppointment = await this.appointmentModel.create(appointment);

    this.appointmentsProducer
      .enqueuePrebooking(createdAppointment)
      .catch((err) => console.log(err));

    return createdAppointment;
  }

  async statusUpdate(params: AppointmentStatusUpdateDto) {
    const appointment = await this.appointmentModel.findOne({
      appointmentId: params.appointmentId,
    });
    if (!appointment) {
      throw new BadRequestException('Appointment not found');
    }

    let slotNewStatus: string;
    switch (params.status) {
      case 'confirmed':
        slotNewStatus = 'taken';
        break;
      default:
        slotNewStatus = 'available';
    }

    const updated = await this.appointmentModel.updateOne(
      { appointmentId: appointment.appointmentId },
      {
        status: params.status,
        'slot.status': slotNewStatus,
      },
    );

    this.appointmentsProducer
      .enqueueConfirmedAppointment(appointment)
      .catch((err) => console.log(err));

    return updated;
  }
}
