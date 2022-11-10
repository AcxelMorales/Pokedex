import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IPokemonResult, IPokemonData } from './interfaces';

import { Pokemon } from '../pokemon/entities/pokemon.entity';

import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed(): Promise<IPokemonResult[]> {
    await this.pokemonModel.deleteMany();

    const { results } = await this.http.get<IPokemonData>('https://pokeapi.co/api/v2/pokemon?limit=10');

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
