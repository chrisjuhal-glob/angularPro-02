import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonsList } from '../../pokemons/components/pokemons-list/pokemons-list';
import { PokemonsListSkeleton } from './ui/pokemons-list-skeleton/pokemons-list-skeleton';
import { PokemonService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsList, PokemonsListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonsService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(map((params) => Math.max(1, Number(params['page'] ?? 1)))),
  );

  public loadOnPageChanged = effect(() => {
    const page = this.currentPage();
    if (page) {
      this.loadPokemons(page);
    }
  });

  public loadPokemons(page: number = 0) {
    const _page = this.currentPage()! + page;
    return this.pokemonsService
      .getPokemons(_page)
      .pipe(tap(() => this.title.setTitle(`Pokemons - Page ${_page}`)))
      .subscribe((data) => {
        this.pokemons.set(data);
        this.isLoading.set(false);
      });
  }
}
