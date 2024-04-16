import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentStatusUpdateDto } from './dto/appointment-status-update.dto';

@Controller()
export class AppointmentWebhooksController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('/api/v1/appointments-webhooks/status')
  @HttpCode(202)
  async appointmentStatusWebhook(@Body() body: AppointmentStatusUpdateDto) {
    return await this.appointmentsService.statusUpdate(body);
  }
}
