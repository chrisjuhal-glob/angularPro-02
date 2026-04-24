import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page'),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page'),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon/pokemon-page'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
