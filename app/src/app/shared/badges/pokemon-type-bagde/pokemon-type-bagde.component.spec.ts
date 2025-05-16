import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeBagdeComponent } from './pokemon-type-bagde.component';

describe('PokemonTypeBagdeComponent', () => {
  let component: PokemonTypeBagdeComponent;
  let fixture: ComponentFixture<PokemonTypeBagdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTypeBagdeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonTypeBagdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
