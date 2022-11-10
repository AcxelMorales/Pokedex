import { Controller, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

import { IResponse } from '../pokemon/interfaces';

@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Get()
  async executeSeed(): Promise<IResponse> {
    await this.seedService.executeSeed();

    return {
      status: 200,
      data: 'Executed seed',
    };
  }

}
