import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getPokemonImage(id: number): string {
    const cacheKey = `pokemon_img_${id}`;
    const cachedUrl = sessionStorage.getItem(cacheKey);

    if (cachedUrl && cachedUrl !== 'not_found') return cachedUrl;
    if (cachedUrl === 'not_found') return 'assets/png/pokeball.png'; // fallback

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const img = new Image();
    img.src = url;
    img.onload = () => sessionStorage.setItem(cacheKey, url);
    img.onerror = () => sessionStorage.setItem(cacheKey, 'not_found');

    return url;
  }
}
