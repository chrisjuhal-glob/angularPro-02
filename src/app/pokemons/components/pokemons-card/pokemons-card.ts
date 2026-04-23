import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemons-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './pokemons-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsCard {
  public pokemon = input<SimplePokemon>();
  public readonly pokemonUrl = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon()?.id || ''}.png`;
  });
}
