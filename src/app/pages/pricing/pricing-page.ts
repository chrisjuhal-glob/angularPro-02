import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Pricing');
    this.meta.updateTag({
      name: 'description',
      content:
        'Discover our competitive pricing plans for Pokemon SSR, offering great value for trainers of all levels. Choose the perfect plan to enhance your Pokemon experience.',
    });
  }
}
