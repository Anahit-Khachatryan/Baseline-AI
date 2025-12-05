import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthActions } from '../actions/auth.actions';
import { SignalRActions } from '../actions/signalr.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import type { Credentials } from '../models/auth.models';
import { SessionAuthService } from '../../auth/session-auth.service';
import { Router } from '@angular/router';

export const login$ = createEffect(
  (actions = inject(Actions), authService = inject(SessionAuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }: { credentials: Credentials }) =>
        authService.login(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              token: response.token ?? '',
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
  (actions = inject(Actions), router = inject(Router), authService = inject(SessionAuthService)) =>
    actions.pipe(
      ofType(AuthActions.logout),
      tap(() => authService.logout().subscribe(() => {
        console.log('Logout successful');
      })),
      tap(() => router.navigateByUrl('/login')),
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

export const loadSession$ = createEffect(
  (actions = inject(Actions), authService = inject(SessionAuthService)) =>
    actions.pipe(
      ofType(AuthActions.loadSession),
      switchMap(() =>
        authService.getSession().pipe(
          map((user) => AuthActions.loadSessionSuccess({ user })),
          catchError((err: unknown) => {
            const error = err instanceof Error ? err.message : 'Session load failed';
            return of(AuthActions.loadSessionError({ error }));
          }),
        ),
      ),
    ),
  { functional: true },
);
