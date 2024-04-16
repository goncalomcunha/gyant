import { Injectable } from '@nestjs/common';
import { Provider } from './provider.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>,
  ) {}

  async find(): Promise<Provider[]> {
    return await this.providerModel.find().sort({ name: 'desc' }).exec();
  }

  async create(body: CreateProviderDto): Promise<Provider> {
    return await this.providerModel.create({
      name: body.name,
    });
  }
}
