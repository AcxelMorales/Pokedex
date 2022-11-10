import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { PokemonService } from './pokemon.service';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { IResponse } from './interfaces';

import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {

  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto): Promise<IResponse> {
    return {
      status: 201,
      data: await this.pokemonService.create(createPokemonDto),
    };
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<IResponse> {
    return {
      status: 200,
      data: await this.pokemonService.findAll(paginationDto),
    };
  }

  @Get(':term')
  async findOne(@Param('term') term: string): Promise<IResponse> {
    return {
      status: 200,
      data: await this.pokemonService.findOne(term),
    };
  }

  @Patch(':term')
  async update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<IResponse> {
    return {
      status: 200,
      data: await this.pokemonService.update(term, updatePokemonDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<IResponse> {
    await this.pokemonService.remove(id);

    return {
      status: 200,
      data: 'Pokemon deleted',
    };
  }

}
