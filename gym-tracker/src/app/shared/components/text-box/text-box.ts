import { Component, input, signal } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'gym-tracker-text-box',
  styles: `
    :host {
      width: 100%;
      position: relative;
    }
    input {
      width: 100%;
    }
    .error {
      position: absolute;
      bottom: -26px;
      z-index: 1;
      left: 0px;
      padding: 4px 2px;
      width: 100%;
      height: auto;
      background-color: var(--color-error-25);
      border-bottom: 2px solid var(--color-error);
      color: var(--color-error);
    }
  `,
  template: `@if (formField()) {
    @let _ = formField()!;
    <input
      [formField]="_"
      [type]="type()"
      [placeholder]="placeholder()"
      [autocomplete]="autocomplete()"
      [style.borderBottom]="_().touched() && _().invalid() ? '2px solid var(--color-error)' : ''"
      (focus)="focused.set(true)"
      (blur)="focused.set(false)"
    />
    @if (_().touched() && _().invalid() && focused()) {
      <small class="error">{{ _().errors()[0].message }}</small>
    }
  }`,
})
export class TextBox {
  public formField = input<Field<string, string | number>>();
  public type = input<string>('text');
  public placeholder = input<string>('');
  public autocomplete = input<string>('');
  public focused = signal<boolean>(false);
}
