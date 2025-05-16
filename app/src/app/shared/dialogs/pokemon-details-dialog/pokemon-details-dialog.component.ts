import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule  } from '@angular/material/dialog';
import { PokemonTypeBagdeComponent } from '../../badges/pokemon-type-bagde/pokemon-type-bagde.component';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PokemonTypeBagdeComponent],
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrl: './pokemon-details-dialog.component.scss'
})
export class PokemonDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public pokemonService: PokemonService) {}

  
}
