import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from './auth.model';
import { AuthStateStore } from './auth.store';

export const roleGuard =
  (role: UserRole): CanActivateFn =>
  () => {
    const auth = inject(AuthStateStore);
    const router = inject(Router);
    if (!auth.isAuthenticated()) return router.parseUrl('/login');
    return auth.user()?.role === role ? true : router.parseUrl('/');
  };

export const disconnectedGuard = (): CanActivateFn => () => {
  const auth = inject(AuthStateStore);
  const router = inject(Router);
  if (auth.isAuthenticated()) {
    if (auth.user()?.role === UserRole.USER) {
      return router.parseUrl('/me');
    }
    if (auth.user()?.role === UserRole.USER) {
      return router.parseUrl('/admin');
    }
  }
  return router.parseUrl('/');
};
