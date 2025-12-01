import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthActions } from '../actions/authorization.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import type { Credentials } from '../models/auth.models';
import { JwtAuthService } from '../../auth/jwt-auth.service';

export const login$ = createEffect(
  (actions = inject(Actions), authService = inject(JwtAuthService)) => {
    return actions.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }: { credentials: Credentials }) =>
        authService.login(credentials).pipe(
          map((token: string) => AuthActions.loginSuccess({ token })),
          catchError((err: unknown) => {
            const message = typeof err === 'string' ? err : 'Login failed';
            return of(AuthActions.loginError({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
