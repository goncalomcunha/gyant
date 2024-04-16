import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async find(): Promise<Appointment[]> {
    return await this.appointmentModel.find().sort({ name: 'desc' }).exec();
  }

  async create(body: CreateAppointmentDto): Promise<Appointment> {
    // TODO: validate if slot is still available

    const appointment = new Appointment({
      appointmentId: 'asdas',
      slot: {
        code: body.slotId,
        startsAt: new Date(),
        status: 'reserved',
      },
    });

    return await this.appointmentModel.create(appointment);
  }
}
