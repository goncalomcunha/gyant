import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Provider } from '../providers/provider.schema';

export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop()
  code: string;

  @Prop()
  status: string;

  @Prop()
  startsAt: Date;

  @Prop()
  provider: Provider;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
