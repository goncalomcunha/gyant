import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IntegrationsConsumer implements OnModuleInit {
  private readonly channelWrapper: ChannelWrapper;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    const connection = amqp.connect([rabbitmqUrl]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertQueue('prebookings', { durable: true });
      await channel.consume('prebookings', async (message) => {
        if (message) {
          const content = JSON.parse(message.content.toString());
          channel.ack(message);
          firstValueFrom(
            this.httpService.post(
              'http://174.18.0.102:3000/api/v1/integrations/appointments',
              content,
              {
                headers: { 'Content-Type': 'application/json' },
              },
            ),
          );
        }
      });
    });
  }
}
