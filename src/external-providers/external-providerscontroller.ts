import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller()
export class ExternalProvidersController {
  @Post('/fake-external-provider/appointment')
  @HttpCode(202)
  createFakeAppoint(): string {
    return 'OK';
  }
}
