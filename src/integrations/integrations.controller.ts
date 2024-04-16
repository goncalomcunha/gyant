import { Controller, Post } from '@nestjs/common';

@Controller()
export class IntegrationsController {
  @Post('/api/v1/integrations/appointments')
  async prebookAppointment() {
    return 'foo';
  }
}
