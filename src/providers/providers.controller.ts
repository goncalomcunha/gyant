import { Controller, Get, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Provider } from './provider.schema';

@Controller()
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('/providers')
  async find(): Promise<Provider[]> {
    const providers = await this.providersService.find();
    return providers;
  }

  @Post('/providers')
  async createProvider(): Promise<Provider> {
    const provider = await this.providersService.create({
      name: Date.now().toString(),
    });
    return provider;
  }
}
