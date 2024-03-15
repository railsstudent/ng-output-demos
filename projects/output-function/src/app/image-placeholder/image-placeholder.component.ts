import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-placeholder',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Redo https://dev.me/products/image-placeholder</h3>
    <div class="container">
      <div class="field">
        <label for="text">
          <span>Text: </span>
          <input id="text" name="text" [(ngModel)]="text" />
        </label>
      </div>
      <div class="field">
        <label for="width">
          <span>Width: </span>
          <input id="width" name="width" [(ngModel)]="width" type="number" min="10" />
        </label>
      </div>
      <div class="field">
        <label for="height">
          <span>Height: </span>
          <input id="height" name="height" [(ngModel)]="height" type="number" min="10" />
        </label>
      </div>
      <div class="field">
        <label for="color">
          <span>Color: </span>
          <input id="color" name="color" [(ngModel)]="color" />
        </label>
      </div>
      <div class="field">
        <label for="backgroundColor">
          <span>Background color: </span>
          <input id="backgroundColor" name="backgroundColor" [(ngModel)]="backgroundColor" />
        </label>
      </div>
    </div>
  `,
  styles: `
    h3 {
      margin-bottom: 1rem;
    }

    div.container {
      padding: 0.5rem;
      border: 1px solid black;
      border-radius: 12px;
    }

    div.field {
      padding: 0.25rem;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #4aa;
      border-radius: 8px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePlaceholderComponent {
  text = signal('Output function');
  width = signal(300);
  height = signal(100);
  color = signal('#fff');
  backgroundColor = signal('#000');

  url = computed(() => {
    const text = this.text() ? encodeURIComponent(this.text()) : `${this.width()} x ${this.height()}`;

    const color = encodeURIComponent(this.color());
    const backgroundColor = encodeURIComponent(this.backgroundColor());

    return `https://via.assets.so/img.jpg?w=${this.width()}&h=${this.height()}&&tc=${color}&bg=${backgroundColor}&t=${text}`;
  });

  placeholderUrl = output<string>({
    alias: 'url'
  });

  constructor() {
    effect(() => this.placeholderUrl.emit(this.url()))
  }
}