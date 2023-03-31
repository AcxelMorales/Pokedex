import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';

import { IPokemonResult, IPokemonData } from './interfaces';

import { Pokemon } from '../pokemon/entities/pokemon.entity';

import { AxiosAdapter } from '../common/adapters/axios.adapter';

import { LoggerService, Types } from '../log/logger.service';

@Injectable()
export class SeedService {

  private urlApi: string;
  private limit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.urlApi = this.configService.get<string>('API_POKEMON');
    this.limit = this.configService.get<number>('DEFAULT_LIMIT');
  }

  async executeSeed(): Promise<IPokemonResult[]> {
    await this.pokemonModel.deleteMany();

    const { results } = await this.http.get<IPokemonData>(`${this.urlApi}?limit=${this.limit}`);

    const pokemonToInsert: { name: string, no: number }[] = [];

    results.forEach(({ name, url }) => {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    this.loggerService.writeLog(
      `Se han creado ${this.limit} pokemones`,
      'SeedService',
      Types.debug
    );

    return results;
  }

}
