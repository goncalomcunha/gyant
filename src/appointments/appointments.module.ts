import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentWebhooksController } from './webhooks.controller';
import { AppointmentsProducer } from './appointments.producer';

@Module({
  controllers: [AppointmentsController, AppointmentWebhooksController],
  providers: [AppointmentsService, AppointmentsProducer],
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
})
export class AppointmentsModule {}
