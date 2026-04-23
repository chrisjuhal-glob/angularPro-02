import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonsAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http: HttpClient = inject(HttpClient);

  getPokemons(page: number): Observable<SimplePokemon[]> {
    page = (page - 1) * 10;
    page = Math.max(0, page);

    return this.http
      .get<PokemonsAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`)
      .pipe(
        map((response) => {
          const simplePokemons: SimplePokemon[] = response.results.map((pokemon, index) => {
            const id = pokemon.url.split('/').slice(-2, -1)[0] || '';
            return {
              name: pokemon.name,
              id: id,
            };
          });
          return simplePokemons;
        }),
      );
  }

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
