import { Injectable } from "@angular/core";
import { PokemonService } from "../api/pokemon.service";
import { PokemonStoreService } from "./pokemon-store.service";

@Injectable({
    providedIn: 'root'
})
export class PokemonSearchService {
    constructor(public storeService: PokemonStoreService, private pokemonService: PokemonService) { }

    //Search Pokemon by name
    searchPokemon(name: string) {
        if (!name?.trim()) {
            this.storeService.filteredPokemons = [...this.storeService.pokemons];
            return;
        }

        this.pokemonService.getPokemonByName(name.toLowerCase()).subscribe(
            (res) => {
                this.storeService.filteredPokemons = [res];
            },
            () => {
                alert(`Pokémon "${name}" não encontrado.`);
                this.storeService.filteredPokemons = [];
            }
        );
    }
}