import { Component, Inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/api/pokemon.service';
//import { PokemonStoreService } from '../../services/app/pokemon.service';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PokemonStoreService } from '../../services/app/pokemon-store.service';
import { PokemonSearchService } from '../../services/app/search-service';

@Component({
  selector: 'app-root',
  templateUrl: './pokedex-app.component.html',
  styleUrls: ['./pokedex-app.component.scss']
})
export class PokedexAppComponent implements OnInit {
  //Search variables
  searchTerm = '';
  searchControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  constructor(
    public storeService: PokemonStoreService,
    public searchService: PokemonSearchService
  ) { }

  ngOnInit() {
    //Load inital Pokemon data
    this.storeService.loadPokemons();

    //Initialize filter option for autocomplete
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    //Return original list if search term is empty
    this.searchControl.valueChanges.subscribe(value => {
      if (!value || value.trim() === '') {
        this.storeService.filteredPokemons = [...this.storeService.pokemons];
      }
    });
  }

  //Filter Pokemon names for autocomplete
  private _filter(value: string): string[] {
    const filterValue = value;
    return this.storeService.allPokemonNames
      .map(p => p.name)
      .filter(name => name.includes(filterValue));
  }
}