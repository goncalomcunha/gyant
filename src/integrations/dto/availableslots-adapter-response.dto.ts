export class AvailableSlotsAdapterResponseDto {
  date: Date;
  slots: Array<{
    slotId: string;
    time: string;
  }>;
}
