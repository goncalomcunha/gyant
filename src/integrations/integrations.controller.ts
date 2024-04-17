import { Body, Controller, Post } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Appointment } from '../appointments/appointment.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Integrations Manager')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/api/v1/integrations/appointments')
  async prebookAppointment(@Body() appointment: Appointment) {
    return this.integrationsService.createPrebooking(appointment);
  }
}
