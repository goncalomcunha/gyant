import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProvidersController {
  @Get('/providers')
  getProviders() {
    return 'foo';
  }
}
