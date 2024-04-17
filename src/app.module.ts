import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExternalProvidersModule } from './external-providers/external-providers.module';
import { PatientsModule } from './patients/patients.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URL'),
        };
      },
    }),

    AppointmentsModule,
    ExternalProvidersModule,
    IntegrationsModule,
    ProvidersModule,
    PatientsModule,
    SlotsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
