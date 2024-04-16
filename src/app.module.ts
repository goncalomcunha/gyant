import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProvidersModule,
    MongooseModule.forRoot('mongodb://174.18.0.100:27017/gyant'),
  ],
})
export class AppModule {}
