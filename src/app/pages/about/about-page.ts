import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      document.body.style.backgroundColor = '#ccc';
      console.log('This code runs only in the browser');
    }
    if (isPlatformServer(this.platform)) {
      console.log('This code runs only in the server');
    }
    this.title.setTitle('About us');
    this.meta.addTags([
      { name: 'description', content: 'Learn more about pokemon-ssr, the Angular SSR demo app.' },
      { name: 'keywords', content: 'Angular, SSR, Pokemon, About' },
    ]);
  }
}
