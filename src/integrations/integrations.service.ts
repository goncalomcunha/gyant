import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrebookingResponseDto } from './dto/prebooking-response.dto';
import { firstValueFrom } from 'rxjs';
import { Appointment } from '../appointments/appointment.schema';

@Injectable()
export class IntegrationsService {
  constructor(private readonly httpService: HttpService) {}

  async createPrebooking(
    appointment: Appointment,
  ): Promise<PrebookingResponseDto> {
    // Route the request
    let adapterUrl: string;
    switch (appointment.slot.provider.name) {
      case 'adapter1':
        adapterUrl =
          'http://174.18.0.102:3000/api/v1/adapter1/book-appointment';
        break;
      case 'adapter2':
        adapterUrl =
          'http://174.18.0.102:3000/api/v1/adapter2/book-appointment';
        break;
    }

    // const { data } = await firstValueFrom(
    //   this.httpService.post<PrebookingResponseDto>(adapterUrl, appointment, {
    //     headers: { 'Content-Type': 'application/json' },
    //   }),
    // );

    return 'data' as any;
  }
}
