import { Routes } from '@angular/router';
import { UserRole } from './core/auth/auth.model';
import { disconnectedGuard, roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [roleGuard(UserRole.ADMIN)],
    loadChildren: () => import('./features/admin/admin-module').then((m) => m.AdminModule),
  },
  {
    path: 'me',
    canActivate: [roleGuard(UserRole.USER)],
    loadChildren: () => import('./features/user/user-module').then((m) => m.UserModule),
  },
  {
    path: 'auth',
    canActivate: [disconnectedGuard],
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'auth' },
];
