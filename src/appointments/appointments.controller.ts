import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './appointment.schema';
import { AppointmentsService } from './appointments.service';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('/api/v1/appointments')
  async find(): Promise<Appointment[]> {
    const appointments = await this.appointmentsService.find();
    return appointments;
  }

  @Post('/api/v1/appointments')
  @HttpCode(201)
  async createAppointment(
    @Body() body: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.create(body);
    return appointment;
  }
}
