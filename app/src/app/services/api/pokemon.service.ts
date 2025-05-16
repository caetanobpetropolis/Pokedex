import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) { }

  // Fetch all Pokemon data with pagination
  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  // Fetch Pokemon details by name
  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
