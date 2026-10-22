import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIcon } from '../../../shared/components/svg-icon/svg-icon';
import { AdminModule } from '../../admin/admin-module';

@Component({
  imports: [AdminModule, RouterLink, SvgIcon],
  selector: 'gym-tracker-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  protected passwordVisible = signal(false);

  protected togglePasswordVisibility = () => {
    this.passwordVisible.update((_) => !_);
  };
}
