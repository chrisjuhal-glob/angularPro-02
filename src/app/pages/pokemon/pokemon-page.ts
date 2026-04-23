import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage {
  public pokemon = signal<Pokemon | null>(null);
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  public title = inject(Title);
  public meta = inject(Meta);
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') || '';
    this.pokemonService
      .getPokemon(name)
      .pipe(
        tap(({ name, id }) => {
          const title = `#${id} - ${name}`;
          const description = `Detalles sobre ${name}`;
          this.title.setTitle(title);
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ name: 'og:title', content: title });
          this.meta.updateTag({ name: 'og:description', content: description });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon()?.id || ''}.png`,
          });
        }),
      )
      .subscribe((data) => {
        this.pokemon.set(data);
      });
  }
}
