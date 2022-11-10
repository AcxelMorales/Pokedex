import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { PokemonService } from './pokemon.service';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { IResponse } from './interfaces';

@Controller('pokemon')
export class PokemonController {

  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto): Promise<IResponse> {
    return {
      status: 201,
      data: await this.pokemonService.create(createPokemonDto),
    }
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  async findOne(@Param('term') term: string): Promise<IResponse> {
    return {
      status: 200,
      data: await this.pokemonService.findOne(term),
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }

}
