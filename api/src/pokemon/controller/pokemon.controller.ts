import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Query } from "@nestjs/common";
import { PokemonService } from "../service/pokemon.service";

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }


  //Fetches a list of pokemons with optional offset and limit
  //@Query('offset') is used to get the offset value from the query string
  //@Query('limit') is used to get the limit value from the query string
  @Get()
  async getPokemons(
    @Query('offset') offset,
    @Query('limit') limit
  ): Promise<any> {
    try {
      return await this.pokemonService.findAll(offset, limit);
    } catch (error) {
      throw new InternalServerErrorException('Cannot fetch pokemon lists');
    }
  }

  //Fetches a pokemon and its details by name
  //@Param('name') is used to get the name value from the URL parameter
  @Get(':name')
  async getPokemon(@Param('name') name: string): Promise<any> {
    try {
      return await this.pokemonService.findByName(name);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.status === 404
      ) {
        throw new NotFoundException(`Pokémon "${name}" not found`);
      }

      throw new InternalServerErrorException('Cannot fetch pokemon');
    }
  }
}
