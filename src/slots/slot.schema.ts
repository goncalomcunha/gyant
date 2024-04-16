import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop()
  code: string;

  @Prop()
  status: string;

  @Prop()
  startsAt: Date;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
