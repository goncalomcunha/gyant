import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Slot } from '../slots/slot.schema';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  appointmentId: string;

  @Prop()
  status: string;

  @Prop()
  slot: Slot;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
