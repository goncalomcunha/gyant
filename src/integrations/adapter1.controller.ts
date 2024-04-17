import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PrebookingAdapterResponseDto } from './dto/prebooking-adapter-response.dto';
import { ProviderInfoAdapterResponseDto } from './dto/providerinfo-adapter-response.dto';
import { AvailableSlotsAdapterResponseDto } from './dto/availableslots-adapter-response.dto';

@Controller()
export class Adapter1Controller {
  @Post('/api/v1/adapter1/appointments')
  @HttpCode(202)
  async bookAppointment(): Promise<PrebookingAdapterResponseDto> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return { status: 'waiting_confirmation' };
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
