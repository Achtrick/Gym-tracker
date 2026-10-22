import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIcon } from '../../../shared/components/svg-icon/svg-icon';

@Component({
  imports: [RouterLink, SvgIcon],
  selector: 'gym-tracker-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  protected passwordVisible = signal(false);

  protected togglePasswordVisibility = () => {
    this.passwordVisible.update((_) => !_);
  };
}
