import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

import { IPokemonResult, IPokemonData } from './interfaces';

import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed(): Promise<IPokemonResult[]> {
    await this.pokemonModel.deleteMany();

    const { data: { results } } = await this.axios.get<IPokemonData>('https://pokeapi.co/api/v2/pokemon?limit=10');

    const pokemonToInsert: { name: string, no: number }[] = [];

    results.forEach(({ name, url }) => {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return results;
  }

}
