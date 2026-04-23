import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // ✅ Home (optional)
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  // ✅ Pagination (10 pages)
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: 10 }, (_, i) => ({
        page: `${i + 1}`,
      }));
    },
  },

  // ✅ Pokemon detail (151 pages)
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();

      return data.results.map((p: any) => ({
        name: p.name,
      }));
    },
  },

  // ✅ Fallback SSR (important)
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
