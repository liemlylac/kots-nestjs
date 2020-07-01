import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@core/services/logger-service';
import { Resource } from '../entity/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  getList() {
    return this.resourceRepository.find({ relations: ['actions'] });
  }
}
