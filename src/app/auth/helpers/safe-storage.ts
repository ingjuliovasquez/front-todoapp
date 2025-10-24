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

  private get isBrowser() {
    return isPlatformBrowser(this.platformId) &&
           typeof window !== 'undefined' &&
           !!window.localStorage;
  }

  private get store(): IStorageLike {
    return this.isBrowser ? window.localStorage : this.mem;
  }

  getItem(key: string) { return this.store.getItem(key); }
  setItem(key: string, value: string) { this.store.setItem(key, value); }
  removeItem(key: string) { this.store.removeItem(key); }
}
