import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface IStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class MemoryStorage implements IStorageLike {
  private map = new Map<string, string>();
  getItem(k: string) { return this.map.has(k) ? this.map.get(k)! : null; }
  setItem(k: string, v: string) { this.map.set(k, v); }
  removeItem(k: string) { this.map.delete(k); }
}

@Injectable({ providedIn: 'root' })
export class SafeStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly mem = new MemoryStorage();
  private _store: IStorageLike | null = null;

  private get isBrowser() {
    return isPlatformBrowser(this.platformId) && typeof window !== 'undefined';
  }

  private resolveStore(): IStorageLike {
    if (!this.isBrowser) return this.mem;

    try {
      const k = '__ss_probe__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return window.localStorage;
    } catch {
      return this.mem;
    }
  }

  private get store(): IStorageLike {
    if (!this._store) this._store = this.resolveStore();
    return this._store;
  }

  getItem(key: string) {
    try { return this.store.getItem(key); } catch { return null; }
  }
  setItem(key: string, value: string) {
    try { this.store.setItem(key, value); } catch { /* noop fallback */ }
  }
  removeItem(key: string) {
    try { this.store.removeItem(key); } catch { /* noop */ }
  }
}
