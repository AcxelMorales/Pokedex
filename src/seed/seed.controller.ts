import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

import { IResponse } from '../pokemon/interfaces';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Get()
  async executeSeed(): Promise<IResponse> {
    return {
      status: 200,
      data: await this.seedService.executeSeed(),
    };
  }

}
