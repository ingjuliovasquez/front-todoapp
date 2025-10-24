import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SafeStorageService } from '../helpers/safe-storage';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private storage = inject(SafeStorageService);
  private platformId = inject(PLATFORM_ID);
  private readonly _token = signal<string | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._token.set(this.storage.getItem(TOKEN_KEY));
    }
  }

  get token() { return this._token(); }
  tokenSignal() { return this._token; }

  rehydrateFromBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      this._token.set(this.storage.getItem(TOKEN_KEY));
    }
  }

  setToken(token: string | null) {
    this._token.set(token);
    if (token) this.storage.setItem(TOKEN_KEY, token);
    else this.storage.removeItem(TOKEN_KEY);
  }

  clear() { this.setToken(null); }
  isAuthenticated() { return !!this._token(); }
}
