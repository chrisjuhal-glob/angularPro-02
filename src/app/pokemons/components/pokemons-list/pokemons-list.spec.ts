import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonsList } from './pokemons-list';

const mockPokemons = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];
describe('PokemonListComponent', () => {
  let component: PokemonsList;
  let fixture: ComponentFixture<PokemonsList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonsList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemons', [...mockPokemons]);
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render the pokemon list', () => {
    expect(component.pokemons()).toStrictEqual(mockPokemons);
  });

  it('should render "No hay pokemons" when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const message = compiled.querySelector('span');

    expect(message?.textContent.trim()).toBe('No hay pokemons');
  });
});
