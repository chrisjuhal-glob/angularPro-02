import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'pokemons-list-skeleton',
  imports: [],
  templateUrl: './pokemons-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListSkeleton {

}
