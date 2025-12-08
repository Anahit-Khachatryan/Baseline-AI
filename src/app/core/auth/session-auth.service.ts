import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  login(credentials: Credentials): Observable<any> {
    // Temporarily disable cookie-based auth for local login flow
    // return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials, {
    //   withCredentials: true,
    // });
    return of({ user: { id: 1, username: 'admin' }})
  }

  getSession(): Observable<User> {
    // Temporarily disable cookie-based auth for local session fetching
    // return this.http.get<User>(`${this.baseUrl}/me`, { withCredentials: true });
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  logout(): Observable<void> {
    // Temporarily disable cookie-based auth for local logout
    // return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }
}
 