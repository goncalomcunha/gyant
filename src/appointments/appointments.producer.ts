import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentsProducer {
  private readonly channelWrapper: ChannelWrapper;

  constructor(private readonly configService: ConfigService) {
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    const connection = amqp.connect([rabbitmqUrl]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('prebookings', { durable: true });
      },
    });
  }

  async enqueuePrebooking(appointment: Appointment) {
    await this.channelWrapper.sendToQueue(
      'prebookings',
      Buffer.from(JSON.stringify(appointment)),
      { persistent: true },
    );
  }
}
