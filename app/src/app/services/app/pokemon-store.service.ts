import { Injectable } from "@angular/core";
import { PokemonService } from "../api/pokemon.service";
import { forkJoin } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PokemonStoreService {
    
    //Pokemon lists:
    //allPokemonNames: List of all Pokemon names
    public allPokemonNames: any[] = [];
    //pokemons: Original list of filtered Pokemon
    public pokemons: any[] = [];
    //filteredPokemons: List of filtered Pokemon for search and handling
    public filteredPokemons: any[] = [];

    //Private variables:
    //isLoading: Flag to check if data is loading
    private isLoading = false;
    //offset: Offset for pagination
    private offset = 0;
    //limit: Limit for pagination
    private limit = 20;

    constructor(
        private pokemonService: PokemonService,
    ) { }

    //Load inital Pokemon data
    loadPokemons() {
        if (this.allPokemonNames.length === 0) {
            // Load all Pokemon
            this.pokemonService.getPokemons(0, 1302).subscribe((res) => {
                this.allPokemonNames = res.results;

                // Get details by batch
                this.loadPokemonDetails();
            });
        } else {
            // Get details by batch if already loaded names
            this.loadPokemonDetails();
        }
    }

    //Get Pokemon details by batch
    loadPokemonDetails() {
        if (this.isLoading) return;
        this.isLoading = true;

        const currentBatch = this.allPokemonNames.slice(this.offset, this.offset + this.limit);

        const requests = currentBatch.map((pokemon: any) =>
            this.pokemonService.getPokemonByName(pokemon.name)
        );

        forkJoin(requests).subscribe({
            next: (detailedPokemons) => {
                this.pokemons = [...this.pokemons, ...detailedPokemons];
                this.filteredPokemons = this.pokemons;
                this.offset += this.limit;
            },
            complete: () => (this.isLoading = false),
            error: () => (this.isLoading = false),
        });

    }

}
