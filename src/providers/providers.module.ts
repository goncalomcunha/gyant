import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { Provider, ProviderSchema } from './provider.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersService } from './providers.service';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
})
export class ProvidersModule {}
