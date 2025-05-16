import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokemon-type-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-type-bagde.component.html',
  styleUrl: './pokemon-type-bagde.component.scss'
})
export class PokemonTypeBagdeComponent {
  @Input() type!: string;
}
