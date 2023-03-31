import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { LoggerService } from '../log/logger.service';

import { SeedController } from './seed.controller';

import { PokemonModule } from '../pokemon/pokemon.module';
import { CommonModule } from '../common/common.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService, LoggerService],
  imports: [PokemonModule, CommonModule, ConfigModule],
})
export class SeedModule {}
