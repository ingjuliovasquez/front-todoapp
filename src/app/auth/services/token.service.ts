import { Injectable, signal } from '@angular/core';
import { SafeStorageService } from '../helpers/safe-storage';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly storage: SafeStorageService;
  private readonly _token = signal<string | null>(null);

  constructor(storage: SafeStorageService) {
    this.storage = storage;
    this._token.set(this.storage.getItem(TOKEN_KEY));
  }

  get token() { return this._token(); }

  setToken(token: string | null) {
    this._token.set(token);
    if (token) this.storage.setItem(TOKEN_KEY, token);
    else this.storage.removeItem(TOKEN_KEY);
  }

  clear() { this.setToken(null); }
  isAuthenticated() { return !!this.token; }
}
