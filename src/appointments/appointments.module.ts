import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentWebhooksController } from './webhooks.controller';

@Module({
  controllers: [AppointmentsController, AppointmentWebhooksController],
  providers: [AppointmentsService],
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
})
export class AppointmentsModule {}
