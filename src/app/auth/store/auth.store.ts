import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '../data/auth-api';
import { TokenService } from '../services/token.service';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    isAuthenticated: () => !!store.token(),
  })),

  withMethods((store) => {
    const api = inject(AuthApi);
    const tokens = inject(TokenService);
    const router = inject(Router);

    return {
      hydrateFromStorage: () => {
        const token = tokens.token;
        if (token) {
          patchState(store, { token, error: null });
        }
      },

      login: async (email: string, password: string) => {
        patchState(store, { loading: true, error: null });
        try {
          const res = await api.loginAndStore(email, password);
          const token = res?.data?.token ?? null;

          patchState(store, {
            token,
            loading: false,
            error: null,
          });
          await router.navigateByUrl('/');
        } catch (err: any) {
          patchState(store, {
            loading: false,
            error: err?.error?.message ?? 'Hubo un error con tus credenciales',
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        patchState(store, { loading: true, error: null });
        try {
          await api.registerAndReturn(name, email, password);
          patchState(store, { loading: false, error: null, });
          await router.navigate(['/login']);
        } catch (err: any) {
          patchState(store, {
            loading: false,
            error: err?.error?.message ?? 'No se pudo registrar',
          });
        }
      },

      logout: async () => {
        tokens.clear();
        patchState(store, { token: null, error: null });
        await inject(Router).navigateByUrl('/login');
      },

      setError: (msg: string | null) => {
        patchState(store, { error: msg });
      },

      clearError: () => {
        patchState(store, { error: null });
      },
    };
  }),

  withHooks((store) => ({
    onInit() {
      store.hydrateFromStorage();
    },
  }))
);
