import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { Pokemon } from './entities/pokemon.entity';

import { handleExceptions } from '../utils/handlers.util';

import { LoggerService, Types } from '../log/logger.service';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly loggerService: LoggerService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      this.loggerService.writeLog(
        `Se creo un pokemon: ${JSON.stringify(createPokemonDto)}`,
        'PokemonService',
        Types.debug
      );

      return pokemon;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll({ limit, offset }: PaginationDto): Promise<Pokemon[]> {
    this.loggerService.writeLog(
      `Se obtuvieron todos los pokemones`,
      'PokemonService',
      Types.debug
    );

    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    this.loggerService.writeLog(
      `Se obtuvo un pokemon: ${JSON.stringify(pokemon)}`,
      'PokemonService',
      Types.debug
    );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<any> {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);

      this.loggerService.writeLog(
        `Se actualizo un pokemon: ${JSON.stringify(updatePokemonDto)}`,
        'PokemonService',
        Types.debug
      );

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);

    this.loggerService.writeLog(
      `Se elimino un pokemon con el ID: ${id}`,
      'PokemonService',
      Types.debug
    );
  }

}
