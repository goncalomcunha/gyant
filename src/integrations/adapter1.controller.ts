import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PrebookingAdapterResponseDto } from './dto/prebooking-adapter-response.dto';
import { ProviderInfoAdapterResponseDto } from './dto/providerinfo-adapter-response.dto';
import { AvailableSlotsAdapterResponseDto } from './dto/availableslots-adapter-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrebookingAdapterRequestDto } from './dto/prebooking-adapter-request.dto';

@Controller()
@ApiTags('Adapters')
export class Adapter1Controller {
  constructor(private readonly httpService: HttpService) {}

  @Post('/api/v1/adapter1/appointments')
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
            status: 'confirmed',
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    }, 10_000);

    return { status: 'processing' };
  }

  @Get('/api/v1/adapter1/provider-info')
  async getProviderInfo(): Promise<ProviderInfoAdapterResponseDto> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return {
      name: 'United Health',
      specialty: 'Endocrinology',
      cost: 50,
      location: 'Seattle',
    };
  }

  @Get('/api/v1/adapter1/available-slots')
  async getAvailableSlots(): Promise<AvailableSlotsAdapterResponseDto[]> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return [
      {
        date: new Date(),
        slots: [
          { slotId: String(Math.random()), time: '16:30' },
          { slotId: String(Math.random()), time: '17:30' },
        ],
      },
    ];
  }
}
