import { TestBed } from '@angular/core/testing';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import AboutPage from './pages/about/about-page';
import { Location } from '@angular/common';
import PricingPage from './pages/pricing/pricing-page';
import PokemonsPage from './pages/pokemons/pokemons-page';
import PokemonPage from './pages/pokemon/pokemon-page';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();

    const component = (await aboutRoute!.loadComponent!()) as any;
    expect(component.default).toBe(AboutPage);
  });

  it('should navigate to "/about" and render AboutPageComponent', async () => {
    await router.navigate(['/about']);
    expect(location.path()).toBe('/about');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing');
    expect(pricingRoute).toBeDefined();

    const component = (await pricingRoute!.loadComponent!()) as any;
    expect(component.default).toBe(PricingPage);
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');

  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    await router.navigate(['/pokemons/page/:page']);
    expect(location.path()).toBe('/pokemons/page/:page');

    const component = (await routes.find((route) => route.path === 'pokemons/page/:page')!
      .loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPage);
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['test']);
    expect(location.path()).toBe('/about');
  });
});
