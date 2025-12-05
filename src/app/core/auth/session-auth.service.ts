import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials, User } from '../store/models/auth.models';
import { HttpClient } from '@angular/common/http';

export interface LoginResponse {
  token?: string;
  user: User;
}

interface Auth {
  login(credentials: Credentials): Observable<LoginResponse>;
  getSession(): Observable<User>;
  logout(): Observable<void>;
}

@Injectable({ providedIn: 'root' })
export class SessionAuthService implements Auth {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/auth';

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials, {
      withCredentials: true,
    });
  }

  getSession(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
}
