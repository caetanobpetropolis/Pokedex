import { Component, Inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsDialogComponent } from '../../shared/dialogs/pokemon-details-dialog/pokemon-details-dialog.component';
import { forkJoin, map, Observable, startWith } from 'rxjs';
//import { PokemonCardComponent } from '../../shared/cards/pokemon-card/pokemon-card.component';
import { PokedexTableComponent } from '../../shared/tables/pokemon-table/pokemon-table.component';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './pokedex-app.component.html',
  styleUrls: ['./pokedex-app.component.scss']
})
export class PokedexAppComponent implements OnInit {

  //Original filtered Pokemon list
  pokemons: any[] = [];

  //All Pokemon names
  allPokemonNames: any[] = [];

  //Pagination variables
  offset = 0;
  limit = 20;

  //Search variables
  searchTerm = '';
  searchControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  //Filtered Pokemon list to show on screen, even after search
  filteredPokemons: any[] = [];
  isLoading = false;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {
    //Load inital Pokemon data
    this.loadPokemons();

    //Initialize filter option for autocomplete
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    //Return original list if search term is empty
    this.searchControl.valueChanges.subscribe(value => {
      if (!value || value.trim() === '') {
        this.filteredPokemons = [...this.pokemons];
      }
    });
  }

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

  //Search Pokemon by name
  searchPokemon(name: string) {
    if (!name?.trim()) {
      this.filteredPokemons = [...this.pokemons];
      return;
    }

    this.pokemonService.getPokemonByName(name.toLowerCase()).subscribe(
      (res) => {
        this.filteredPokemons = [res];
      },
      () => {
        alert(`Pokémon "${name}" não encontrado.`);
        this.filteredPokemons = [];
      }
    );
  }

  //Filter Pokemon names for autocomplete
  private _filter(value: string): string[] {
    const filterValue = value;
    return this.allPokemonNames
      .map(p => p.name)
      .filter(name => name.includes(filterValue));
  }
}