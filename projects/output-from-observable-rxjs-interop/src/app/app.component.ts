import { ChangeDetectionStrategy, Component, signal, VERSION } from '@angular/core';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImagePlaceholderComponent],
  template: `
    <header>Angular {{ version }} - {{ title }}</header>
    <app-image-placeholder (placeholderUrl)="changeUrl($event)" />
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
  title = 'outputFromObservable rxJS-interop in 17.3.0';
  url = signal('');
  urlChangeCount = signal(0);

  changeUrl(newUrl: string) {
    this.url.set(newUrl);
    this.urlChangeCount.update((prev) => prev + 1);
  }
}
