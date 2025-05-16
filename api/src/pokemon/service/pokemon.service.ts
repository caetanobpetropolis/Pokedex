import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) { }

  //Fetches a list of pokemons with optional offset and limit
  //@Query('offset') is used to get the offset value from the query string
  //@Query('limit') is used to get the limit value from the query string
  async findAll(offset: number, limit: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      );
      return response.data;
    } catch (error) {
      throw new Error('POKEAPI_FETCH_FAILED');
    }
  }

  //Fetches a pokemon by name
  //@Param('name') is used to get the name value from the URL parameter
  async findByName(name: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      );
      return response.data;
    } catch (error) {
      throw new Error('POKEMON_NOT_FOUND');
    }
  }
}