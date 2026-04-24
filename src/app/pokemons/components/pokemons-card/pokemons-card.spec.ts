import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsCard } from './pokemons-card';
import { NgOptimizedImage } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};
describe('PokemonCardComponent', () => {
  let component: PokemonsCard;
  let fixture: ComponentFixture<PokemonsCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonsCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('should compute the correct pokemon image URL', () => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`;
    expect(component.pokemonUrl()).toBe(url);
  });

  it('should render pekemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h1');
    const imgElement = compiled.querySelector('img');
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`;

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(url);
    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  it('should have the correct routeLink configuration ',()=>{

    //debug element para obtener instancias, en este caso una directiva porque no se encuentra por html
    const debugElement = fixture.debugElement.query(By.directive(RouterLink))
    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = `/pokemon/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl)
  } ) 
});
