import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResponse, RegisterUser } from '../model/auth.model';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private readonly baseUrl= '/v1'

  registerUser(name: string, email: string, password: string) {
    const url = `${environment.apiUrl}${this.baseUrl}/register`;
    return this.http.post<{ message: string }>(url, { name, email, password });
  }

  async registerAndReturn(name: string, email: string, password: string) {
    return await firstValueFrom(this.registerUser(name, email, password));
  }

  login(email: string, password: string) {
    const url = `${environment.apiUrl}${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url, {email, password})
  }

  async loginAndStore(email: string, password: string) {
    const res = await firstValueFrom(this.login(email, password));
    const token = res?.data?.token;
    if (token) this.tokenService.setToken(token);
    return res;
  }

  logout() { this.tokenService.clear(); }
}
