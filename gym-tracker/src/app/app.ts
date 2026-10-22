import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRole } from './core/auth/auth.model';
import { AuthStateStore } from './core/auth/auth.store';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly authStateStore = inject(AuthStateStore);
  protected readonly UserRole = UserRole;

  ngOnInit(): void {}
}
