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
import { PokemonService } from '../../../services/pokemon.service';

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
  constructor(private dialog: MatDialog, public pokemonService: PokemonService) { }
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource = new MatTableDataSource<any>();
  isDesktop = true;
  displayedColumns: string[] = [];


  @Input() set pokemons(value: any[]) {
    this.dataSource.data = value;
    if (this.table) {
      this.table.renderRows();
    }
  }

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }


  getStat(pokemon: any, statName: string): number {
    return pokemon.stats.find((s: any) => s.stat.name === statName)?.base_stat ?? 0;
  }

  getTotalStats(pokemon: any): number {
    return pokemon.stats.reduce((acc: number, stat: any) => acc + stat.base_stat, 0);
  }

  pokemonDetails(pokemon: any) {
    this.dialog.open(PokemonDetailsDialogComponent, {
      data: pokemon
    });
  }

  checkScreenSize(): void {
    this.isDesktop = window.innerWidth >= 768;

    this.displayedColumns = [
      'id',
      'name',
      'types',
      ...(this.isDesktop
        ? ['total', 'hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed']
        : []),
    ];
  }
}
