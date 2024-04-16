import { Module } from '@nestjs/common';
import { IntegrationsConsumer } from './integrations.consumer';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, IntegrationsConsumer],
  imports: [HttpModule],
})
export class IntegrationsModule {}
