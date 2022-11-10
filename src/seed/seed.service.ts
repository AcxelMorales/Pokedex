import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

import { IPokemonResult, IPokemonData } from './interfaces';

import { Pokemon } from '../pokemon/entities/pokemon.entity';

import { handleExceptions } from '../utils/handlers.util';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed(): Promise<IPokemonResult[]> {
    //TODO Se agrego limpieza de la base de datos
    await this.pokemonModel.deleteMany();

    const { data: { results } } = await this.axios.get<IPokemonData>('https://pokeapi.co/api/v2/pokemon?limit=10');

    results.forEach(async ({ name, url }) => {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];

      try {
        await this.pokemonModel.create({ name, no });
      } catch (error) {
        handleExceptions(error);
      }
    });

    return results;
  }

}
