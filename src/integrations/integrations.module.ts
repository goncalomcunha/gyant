import { Module } from '@nestjs/common';
import { IntegrationsConsumer } from './integrations.consumer';

@Module({
  providers: [IntegrationsConsumer],
})
export class IntegrationsModule {}
