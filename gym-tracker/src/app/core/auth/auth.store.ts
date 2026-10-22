import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { readSession, TOKEN_KEY } from '../../utils/jwt';
import { User, UserRole } from './auth.model';

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialAuthState: AuthState = {
  user: null,
  token: null,
};

export const AuthStateStore = signalStore(
  { providedIn: 'root' },

  withState(initialAuthState),

  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
    isAdmin: computed(() => user()?.role === UserRole.ADMIN),
  })),

  withMethods((store, http = inject(HttpClient)) => {
    function setSession(token: string): boolean {
      const session = readSession(token);
      if (!session) return false;
      localStorage.setItem(TOKEN_KEY, token);
      patchState(store, session);
      return true;
    }

    function logout() {
      localStorage.removeItem(TOKEN_KEY);
      patchState(store, initialAuthState);
    }

    return {
      setSession,
      logout,
      async login(credentials: { email: string; password: string }) {
        const { token } = await firstValueFrom(
          http.post<{ token: string }>('/api/auth/login', credentials),
        );
        if (!setSession(token)) throw new Error('Invalid token received');
      },
    };
  }),

  withHooks({
    onInit(store) {
      let token: string | null = null;
      try {
        token = localStorage.getItem(TOKEN_KEY);
      } catch {
        // storage unavailable (e.g. private mode restrictions)
      }
      const session = readSession(token);
      if (session) {
        patchState(store, session);
      } else if (token) {
        store.logout(); // expired or invalid: clean it up
      }
    },
  }),
);
