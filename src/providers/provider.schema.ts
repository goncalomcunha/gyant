import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema()
export class Provider {
  @Prop()
  name: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
