import { Component, effect, inject, input, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgContentService } from '../../services/svg-content';

@Component({
  imports: [],
  selector: 'gym-tracker-svg-icon',
  template: '',
  host: { '[innerHTML]': 'svgContent()' },
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
    }
    :host ::ng-deep svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `,
})
export class SvgIcon {
  public svgName = input<string>();
  protected svgContent = signal<SafeHtml>('');
  private svgContentService = inject(SvgContentService);

  constructor() {
    effect(async () => {
      if (this.svgName()?.length) {
        const svg = await this.svgContentService.read(this.svgName()!);
        this.svgContent.set(svg);
      }
    });
  }
}
