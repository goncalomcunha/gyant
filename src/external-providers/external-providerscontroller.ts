import { Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Fake External Provider - Mocked')
export class ExternalProvidersController {
  @Post('/fake-external-provider/appointment')
  @HttpCode(202)
  createFakeAppoint(): string {
    return 'OK';
  }
}
