import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon/controller/pokemon.controller';
import { PokemonService } from './pokemon/service/pokemon.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokedexApiModule {}
