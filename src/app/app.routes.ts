import { Routes } from '@angular/router';
import { App } from './app';
import { authGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/components/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./auth/components/register/register').then(m => m.Register) },
  { path: '', component: App, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
