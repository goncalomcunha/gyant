import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PrebookingAdapterResponseDto } from './dto/prebooking-adapter-response.dto';
import { ProviderInfoAdapterResponseDto } from './dto/providerinfo-adapter-response.dto';
import { AvailableSlotsAdapterResponseDto } from './dto/availableslots-adapter-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrebookingAdapterRequestDto } from './dto/prebooking-adapter-request.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller()
@ApiTags('Adapters')
export class Adapter2Controller {
  constructor(private readonly httpService: HttpService) {}

  @Post('/api/v1/adapter2/appointments')
  @HttpCode(202)
  async bookAppointment(
    @Body() body: PrebookingAdapterRequestDto,
  ): Promise<PrebookingAdapterResponseDto> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    // Simulate webhook
    setTimeout(() => {
      firstValueFrom(
        this.httpService.post(
          'http://174.18.0.102:3000/api/v1/appointments-webhooks/status',
          {
            appointmentId: body.appointmentId,
            status: 'rejected',
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    }, 10_000);

    return { status: 'processing' };
  }

  @Get('/api/v1/adapter2/provider-info')
  @HttpCode(200)
  async getProviderInfo(): Promise<ProviderInfoAdapterResponseDto> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return {
      name: 'Medicare',
      specialty: 'Nephrology',
      cost: 29.99,
      location: 'Portland',
    };
  }

  @Get('/api/v1/adapter2/available-slots')
  @HttpCode(200)
  async getAvailableSlots(): Promise<AvailableSlotsAdapterResponseDto[]> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return [
      {
        date: new Date(),
        slots: [
          { slotId: String(Math.random()), time: '09:00' },
          { slotId: String(Math.random()), time: '09:30' },
        ],
      },
    ];
  }
}
