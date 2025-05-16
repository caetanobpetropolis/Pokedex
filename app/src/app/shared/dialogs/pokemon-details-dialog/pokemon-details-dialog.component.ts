import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule  } from '@angular/material/dialog';
import { PokemonTypeBagdeComponent } from '../../badges/pokemon-type-bagde/pokemon-type-bagde.component';
import { PokemonService } from '../../../services/api/pokemon.service';

@Component({
  selector: 'app-pokemon-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PokemonTypeBagdeComponent],
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrl: './pokemon-details-dialog.component.scss'
})
export class PokemonDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public pokemonService: PokemonService) {}

  //Sprite URL for the Pokemon
  public spriteUrl : string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ this.data.id +'.png';
}
