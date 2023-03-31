import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { PokemonService } from './pokemon.service';
import { LoggerService } from '../log/logger.service';

import { PokemonController } from './pokemon.controller';

import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, LoggerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ]),
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
