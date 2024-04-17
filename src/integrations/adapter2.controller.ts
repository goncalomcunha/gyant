import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PrebookingAdapterResponseDto } from './dto/prebooking-adapter-response.dto';
import { ProviderInfoAdapterResponseDto } from './dto/providerinfo-adapter-response.dto';
import { AvailableSlotsAdapterResponseDto } from './dto/availableslots-adapter-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Adapters')
export class Adapter2Controller {
  @Post('/api/v1/adapter2/appointments')
  @HttpCode(202)
  async bookAppointment(): Promise<PrebookingAdapterResponseDto> {
    // The healthcare provider is contacted and the response is processed
    // (...)

    return { status: 'rejected' };
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
