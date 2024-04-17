import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentsProducer {
  private readonly prebookings: ChannelWrapper;
  private readonly confirmedAppointments: ChannelWrapper;

  constructor(private readonly configService: ConfigService) {
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    const connection = amqp.connect([rabbitmqUrl]);
    this.prebookings = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('prebookings', { durable: true });
      },
    });
    this.confirmedAppointments = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('confirmedAppointments', { durable: true });
      },
    });
  }

  async enqueuePrebooking(appointment: Appointment) {
    await this.prebookings.sendToQueue(
      'prebookings',
      Buffer.from(JSON.stringify(appointment)),
      { persistent: true },
    );
  }

  async enqueueConfirmedAppointment(appointment: Appointment) {
    await this.confirmedAppointments.sendToQueue(
      'confirmedAppointments',
      Buffer.from(JSON.stringify(appointment)),
      { persistent: true },
    );
  }
}
