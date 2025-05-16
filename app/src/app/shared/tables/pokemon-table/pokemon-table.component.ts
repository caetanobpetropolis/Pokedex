import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { PokemonTypeBagdeComponent } from '../../badges/pokemon-type-bagde/pokemon-type-bagde.component';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PokemonDetailsDialogComponent } from '../../dialogs/pokemon-details-dialog/pokemon-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PokemonStatsService } from '../../../services/app/pokemon-stats.service';
import { ScreenSize } from '../../../util/screen-size';

@Component({
  selector: 'pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    PokemonTypeBagdeComponent
  ]
})
export class PokedexTableComponent {
  constructor(private dialog: MatDialog, public pokemonStatsService: PokemonStatsService, private screenSize: ScreenSize) { }

  //Table variables
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<any>();

  //Sprite URL for the Pokemon
  public spriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  //Window size varriables
  //Check if the screen is desktop or mobile
  isDesktop = true;
  //Displayed columns for the table
  displayedColumns: string[] = [];


  @Input() set pokemons(value: any[] | null) {
    this.dataSource.data = value ?? [];
    if (this.table) {
      this.table.renderRows();
    }
  }

  ngOnInit() {
    this.screenSize.isDesktop$.subscribe(isDesktop => {
      this.isDesktop = isDesktop;
      this.displayedColumns = [
        'id', 'name', 'types',
        ...(isDesktop ? ['total', 'hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'] : [])
      ];
    });
  }

  pokemonDetails(pokemon: any) {
    this.dialog.open(PokemonDetailsDialogComponent, {
      data: pokemon
    });
  }
}
