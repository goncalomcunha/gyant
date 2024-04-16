import { Module } from '@nestjs/common';
import { IntegrationsConsumer } from './integrations.consumer';
import { IntegrationsController } from './integrations.controller';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsConsumer],
})
export class IntegrationsModule {}
