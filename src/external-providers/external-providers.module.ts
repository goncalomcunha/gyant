import { Module } from '@nestjs/common';
import { ExternalProvidersController } from './external-providerscontroller';

@Module({
  controllers: [ExternalProvidersController],
})
export class ExternalProvidersModule {}
