import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Appointment } from '../appointments/appointment.schema';
import { PrebookingIntegrationManagerResponseDto } from './dto/prebooking-integration-manager-response.dto';
import { PrebookingAdapterResponseDto } from './dto/prebooking-adapter-response.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class IntegrationsService {
  constructor(private readonly httpService: HttpService) {}

  async createPrebooking(
    appointment: Appointment,
  ): Promise<PrebookingIntegrationManagerResponseDto> {
    // Route the request
    let adapterUrl: string;
    switch (appointment.slot.provider.name) {
      case 'adapter1':
        adapterUrl = 'http://174.18.0.102:3000/api/v1/adapter1/appointments';
        break;
      case 'adapter2':
        adapterUrl = 'http://174.18.0.102:3000/api/v1/adapter2/appointments';
        break;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .post<PrebookingAdapterResponseDto>(
          adapterUrl,
          { appointmentId: appointment.appointmentId },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw error.message;
          }),
        ),
    );

    // No one will be reading this response on the other end,
    // but we'll process the adapter response anyway just for fun.
    const responseData: PrebookingIntegrationManagerResponseDto = {
      message: '',
    };
    switch (data.status) {
      case 'waiting_confirmation':
        responseData.message =
          'Please wait. The healthcare provider is processing the booking.';
        break;
      case 'rejected':
        // In case the health provider decides to reject immediatelly
        responseData.message = 'Your prebooking was rejected';
        break;
    }

    return responseData;
  }
}
