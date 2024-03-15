import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, VERSION, viewChild } from '@angular/core';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';
import { Observable, scan } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImagePlaceholderComponent, AsyncPipe],
  template: `
    <header>Angular {{ version }} - {{ title }}</header>
    <app-image-placeholder (url)="url = $event" />
    <p>URL: {{ url }}</p>
    <p>URL Change {{ urlChangeCount$ | async }} times.</p>
    <img [src]="url" alt="generic placeholder" />
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
export class AppComponent implements OnInit {
  version = VERSION.full;
  title = 'Output function in 17.3.0';
  url = '';
  child = viewChild.required(ImagePlaceholderComponent);
  urlChangeCount$!: Observable<number>;

  ngOnInit(): void {
    this.urlChangeCount$ = outputToObservable(this.child()    .placeholderUrl)
      .pipe(scan((acc) => acc + 1, 0));
  }
}
