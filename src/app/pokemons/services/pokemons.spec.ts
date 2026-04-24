import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonService } from './pokemons';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonsAPIResponse, SimplePokemon } from '../interfaces';
import { Stat } from '../interfaces/pokemon.interface';

const mockPokeApiResponse: PokemonsAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;
describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    }).compileComponents();
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load a page of pokemons', () => {
    service.getPokemons(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of pokemons', () => {
    service.getPokemons(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=40&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon', () => {
    const name = 'bulbasaur';
    service.getPokemon(name).subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${name}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    const name = 'bulbasaur';
    service.getPokemon(name).subscribe({
      next: () => {
        throw new Error('Should have failed with 404 error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not found - Pokemon not found!!');
      },
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${name}`);
    req.flush('404 error', { status: 404, statusText: 'Not found - Pokemon not found!!' });
  });
});
