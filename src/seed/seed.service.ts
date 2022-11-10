import { Injectable } from '@nestjs/common';

import axios, { AxiosInstance } from 'axios';

import { IPokemonResult, IPokemonData } from './interfaces';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed(): Promise<IPokemonResult[]> {
    const { data: { results } } = await this.axios.get<IPokemonData>('https://pokeapi.co/api/v2/pokemon?limit=10');

    results.forEach(({ name, url }) => {
      const segments: string[] = url.split('/');
      const no: number = +segments[segments.length - 2];
    });

    return results;
  }

}
