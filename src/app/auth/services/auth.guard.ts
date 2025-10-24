import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (tokenService.isAuthenticated()) return true;

  if (isPlatformBrowser(platformId)) {
    const raw = localStorage.getItem('auth_token');
    if (raw) {
      tokenService.setToken(raw);
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};
