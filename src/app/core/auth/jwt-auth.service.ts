import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Credentials, User } from '../store/models/auth.models';

export interface LoginResponse {
  token: string;
  user: User;
}

interface Auth {
  login(credentials: Credentials): Observable<LoginResponse>;
}

@Injectable({ providedIn: 'root' })
export class JwtAuthService implements Auth {
  // replace it with a real HTTP call
  login(credentials: Credentials): Observable<LoginResponse> {
    // Simulate API call with delay
    const user: User = {
      id: '1',
      username: credentials.username,
      name: credentials.username === 'admin' ? 'John Doe' : `${credentials.username.charAt(0).toUpperCase()}${credentials.username.slice(1)} User`,
      email: `${credentials.username}@example.com`,
      role: credentials.username === 'admin' ? 'Admin' : 'Fleet Manager',
    };

    return of({
      token: 'fake-jwt-token',
      user,
    }).pipe(delay(500)); // Simulate network delay
  }
}
