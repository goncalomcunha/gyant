import { Module } from '@nestjs/common';
import { IntegrationsConsumer } from './integrations.consumer';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { HttpModule } from '@nestjs/axios';
import { Adapter1Controller } from './adapter1.controller';
import { Adapter2Controller } from './adapter2.controller';

@Module({
  controllers: [IntegrationsController, Adapter1Controller, Adapter2Controller],
  providers: [IntegrationsService, IntegrationsConsumer],
  imports: [HttpModule],
})
export class IntegrationsModule {}
