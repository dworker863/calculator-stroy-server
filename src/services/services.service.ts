import { Service } from './models/services.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IService } from './interfaces/service.interface';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private serviceModel: typeof Service) {}

  async create(createServiceDto: CreateServiceDto): Promise<IService> {
    const service = await this.serviceModel.create(createServiceDto);
    return service;
  }

  async findAll(): Promise<IService[]> {
    const services = await this.serviceModel.findAll();
    return services;
  }

  async findOne(id: number): Promise<IService> {
    const service = await this.serviceModel.findByPk(id);
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<any> {
    const service = await this.serviceModel.update(updateServiceDto, {
      where: { id },
    });
    return service;
  }

  async remove(id: number): Promise<number> {
    const service = await this.serviceModel.destroy({ where: { id } });
    return service;
  }
}