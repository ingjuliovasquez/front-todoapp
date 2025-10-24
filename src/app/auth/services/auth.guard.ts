import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;

  if (tokenService.isAuthenticated()) return true;

  const raw = localStorage.getItem('auth_token');
  if (raw) {
    tokenService.setToken(raw);
    return true;
  }

  router.navigate(['/login']);
  return false;
};
