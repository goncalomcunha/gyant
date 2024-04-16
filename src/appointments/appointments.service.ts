import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatusUpdateDto } from './dto/appointment-status-update.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async find(): Promise<Appointment[]> {
    return await this.appointmentModel.find().sort({ name: 'desc' }).exec();
  }

  async create(params: CreateAppointmentDto): Promise<Appointment> {
    // TODO: validate if slot is still available

    const appointment = new Appointment({
      appointmentId: 'asdas',
      slot: {
        code: params.slotId,
        startsAt: new Date(),
        status: 'reserved',
      },
    });

    return await this.appointmentModel.create(appointment);
  }

  async statusUpdate(params: AppointmentStatusUpdateDto) {
    const appointment = await this.appointmentModel.findOne({
      appointmentId: params.appointmentId,
    });
    if (!appointment) {
      throw new BadRequestException('Appointment not found');
    }

    return await this.appointmentModel.updateOne(
      { appointmentId: appointment.appointmentId },
      {
        status: params.status,
        'slot.status': 'taken',
      },
    );
  }
}
