import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class IntegrationsConsumer implements OnModuleInit {
  private readonly channelWrapper: ChannelWrapper;

  constructor(private readonly configService: ConfigService) {
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
          console.log('Received message:', content);
          channel.ack(message);
        }
      });
    });
  }
}
