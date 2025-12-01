import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '../store/models/auth.models';

interface Auth {
  login(credentials: Credentials): Observable<string>;
}

@Injectable({ providedIn: 'root' })
export class JwtAuthService implements Auth{
  // replace it with a real HTTP call
  login(credentials: Credentials) {
    return of('fake-jwt-token');
  }
}
