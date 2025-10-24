import { HttpErrorResponse } from '@angular/common/http';

export function toErrorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 401) return 'Sesión expirada o no autenticado.';
    return (err.error?.message as string) || err.message || 'Error de red';
  }
  if (err instanceof Error) return err.message || 'Error inesperado';
  try { return JSON.stringify(err); } catch { return 'Error inesperado'; }
}

export function isAbortOrHmrCancel(err: unknown): boolean {
  if ((err as any)?.name === 'AbortError') return true;
  if (err instanceof HttpErrorResponse && err.status === 0) return true;
  return false;
}
