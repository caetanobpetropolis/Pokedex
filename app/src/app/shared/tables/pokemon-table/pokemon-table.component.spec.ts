import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexTableComponent } from './pokemon-table.component';

describe('PokemonTableComponent', () => {
  let component: PokedexTableComponent;
  let fixture: ComponentFixture<PokedexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokedexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
