import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PokemonStatsService {
  public getStat(pokemon: any, statName: string): number {
    return pokemon.stats.find((s: any) => s.stat.name === statName)?.base_stat ?? 0;
  }

  public getTotalStats(pokemon: any): number {
    return pokemon.stats.reduce((acc: number, stat: any) => acc + stat.base_stat, 0);
  }
}
