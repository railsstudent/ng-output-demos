import { ChangeDetectionStrategy, Component, effect, signal, VERSION, viewChild } from '@angular/core';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImagePlaceholderComponent],
  template: `
    <header>Angular {{ version }} - {{ title }}</header>
    <app-image-placeholder />
    <p>URL: {{ url() }}</p>
    <p>URL Change {{ urlChangeCount() }} times.</p>
    <img [src]="url()" alt="generic placeholder" />
  `,
  styles: `
    :host {
      display: block;
      padding: 0.5rem;
    }

    img {
      margin-top: 1rem;
    }

    p {
      margin-top: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  title = 'Output function in 17.3.0';
  child = viewChild.required(ImagePlaceholderComponent);
  urlChangeCount = signal(0);
  url = signal('');

  constructor() {
    effect((onCleanUp) => {
      const sub = this.child().placeholderUrl.subscribe((ouputtedUrl) => {
        this.url.set(ouputtedUrl);
        this.urlChangeCount.update((prev) => prev + 1);
      });

      onCleanUp(() => sub.unsubscribe());
    })
  }
}
