import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Provider } from './provider.schema';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('/api/v1/providers')
  async find(): Promise<Provider[]> {
    const providers = await this.providersService.find();
    return providers;
  }

  @Post('/api/v1/providers')
  async createProvider(@Body() body: CreateProviderDto): Promise<Provider> {
    const provider = await this.providersService.create(body);
    return provider;
  }
}
