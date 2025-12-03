import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthActions } from '../actions/auth.actions';
import { SignalRActions } from '../actions/signalr.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import type { Credentials } from '../models/auth.models';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/loacl-storage/local-storage.service';

export const login$ = createEffect(
  (actions = inject(Actions), authService = inject(JwtAuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }: { credentials: Credentials }) =>
        authService.login(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              token: response.token,
              user: response.user,
            }),
          ),
          catchError((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Login failed';
            return of(AuthActions.loginError({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const loginNavigate$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) =>
    actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => router.navigateByUrl('/dashboard')),
    ),
  { functional: true, dispatch: false },
);

export const logout$ = createEffect(
  (actions = inject(Actions), router = inject(Router)) =>
    actions.pipe(
      ofType(AuthActions.logout),
      // Navigate to login immediately
      tap(() => router.navigateByUrl('/login')),
      // And dispatch logoutSuccess so other effects (like clearing storage) can react
      map(() => AuthActions.logoutSuccess()),
    ),
  { functional: true },
);

export const startSignalRAfterLogin$ = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        console.log('Login successful, starting SignalR connection...');
      }),
      map(() => SignalRActions.startConnection()),
    );
  },
  { functional: true },
);

// Persist token on successful login so it survives refresh
export const persistTokenOnLogin$ = createEffect(
  (actions = inject(Actions), ls = inject(LocalStorageService)) =>
    actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token }) => ls.set('token', token)),
    ),
  { functional: true, dispatch: false },
);

// Clear token on logout (and on logout success for completeness)
export const clearTokenOnLogout$ = createEffect(
  (actions = inject(Actions), ls = inject(LocalStorageService)) =>
    actions.pipe(
      ofType(AuthActions.logout, AuthActions.logoutSuccess),
      tap(() => ls.remove('token')),
    ),
  { functional: true, dispatch: false },
);
